import type { ApiResult } from "./api-types";

import type { ApiResponse } from "./api-types";
import axiosInstance from "./axiosInstance";

const http = {
    get: <T>(url: string, params?: object) =>
      axiosInstance.get<ApiResponse<T>, ApiResult<T>>(url, { params }),
  
    post: <T, B = unknown>(url: string, body?: B) =>
      axiosInstance.post<ApiResponse<T>, ApiResult<T>>(url, body),
  
    put: <T, B = unknown>(url: string, body?: B) =>
      axiosInstance.put<ApiResponse<T>, ApiResult<T>>(url, body),
  
    patch: <T, B = unknown>(url: string, body?: B) =>
      axiosInstance.patch<ApiResponse<T>, ApiResult<T>>(url, body),
  
    delete: <T>(url: string) =>
      axiosInstance.delete<ApiResponse<T>, ApiResult<T>>(url),
  };

export default http;