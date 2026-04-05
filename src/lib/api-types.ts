// ✅ Your backend response body shape
export interface ApiResponse<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: unknown;
}

// ✅ Wrapper that keeps EVERYTHING — body + status + headers
export interface ApiResult<T = unknown> {
  data: ApiResponse<T>;     // full body
  status: number;           // HTTP status code
  headers: Record<string, string>; // response headers
}