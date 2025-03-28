import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

import { apiClient } from "./apiClient"

export type ApiResponse<T> =
  | { result: T | string; status: number; key: string }
  | { result: string; status: number; key: string }

type HttpMethod = "get" | "post" | "put" | "delete"

const request = async <T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    let response: AxiosResponse<ApiResponse<T>>

    if (method === "get" || method === "delete") {
      response = await apiClient[method](url, config)
    } else {
      response = await apiClient[method](url, data, config)
    }

    return {
      result: response.data.result,
      status: response.status,
      key: response.data.key,
    }
  } catch (error) {
    const axiosError = error as AxiosError<
      ApiResponse<T> | { result: string; key: string }
    >

    return {
      result: axiosError.response?.data?.result ?? "Unknown error",
      status: axiosError.response?.status ?? 500,
      key: axiosError.response?.data?.key ?? "unknownError",
    }
  }
}

export const client = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>("get", url, undefined, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("post", url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("put", url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>("delete", url, undefined, config),
}
