import axios from "axios";
import type { AxiosResponse } from "axios";
import type { ApiError, ApiResponse, ApiResult } from "./api-types";
import env from "@/config/env";

const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  return config;
});

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
  (error) => {
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
