import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import env from "@/config/env";
import type { User } from "@/features/auth/auth.types";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

import type { ApiError, ApiResponse, ApiResult } from "./api-types";

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Single-flight guard: concurrent 401s share one refresh round-trip instead of
// hammering the backend (which would also break refresh-token rotation).
let refreshPromise: Promise<string> | null = null;

async function runRefresh(): Promise<string> {
  if (!refreshPromise) {
    // Use a bare axios call to avoid the circular import
    // (auth.api -> http -> axiosInstance) and to bypass this interceptor so a
    // 401 from /auth/refresh itself does not recurse.
    refreshPromise = axios
      .post<ApiResponse<{ accessToken: string; user: User }>>(
        `${env.apiUrl}/auth/refresh`,
        null,
        { withCredentials: true },
      )
      .then((response) => {
        const accessToken = response.data?.data?.accessToken;
        const user = response.data?.data?.user;
        if (!accessToken || !user) {
          throw new Error("Refresh failed: auth payload was incomplete.");
        }
        useAuthStore.getState().setAuth({ accessToken, user });
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const result: ApiResult = {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    }
    // Axios typings require AxiosResponse here; runtime value is ApiResult.
    return result as unknown as AxiosResponse<ApiResponse>;
  },
  async (error) => {
    const status: number | undefined = error.response?.status;
    const original = error.config as RetriableRequestConfig | undefined;
    const url: string = original?.url ?? "";
    // 401s on /auth/* (login, signup, verify-otp, send-otp, refresh) signal
    // bad credentials or a dead refresh cookie, not an expired access token.
    const isAuthEndpoint = url.startsWith("/auth/");

    if (status === 401 && original && !original._retry && !isAuthEndpoint) {
      original._retry = true;
      try {
        const newToken = await runRefresh();
        original.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(original);
      } catch {
        useAuthStore.getState().logout();
        // fall through to the standard ApiError rejection below
      }
    }

    const apiError: ApiError = error.response?.data ?? {
      success: false,
      message: "An unexpected error occurred",
    };

    return Promise.reject({
      ...apiError,
      status: error.response?.status,
      headers: error.response?.headers,
    });
  },
);

export default axiosInstance;
