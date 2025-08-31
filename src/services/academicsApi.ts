// src/api/academicsApi.ts
import interceptedAxios from "./interceptedAxios";

export const academicsApi = {
  get: (url: string, config?: any) =>
    interceptedAxios.get(
      `${import.meta.env.VITE_ACADEMICS_SERVICE_URL}${url}`,
      {
        ...config,
        withCredentials: true
      }
    ),
  post: (url: string, data: any, config?: any) =>
    interceptedAxios.post(
      `${import.meta.env.VITE_ACADEMICS_SERVICE_URL}${url}`,
      data,
      {
        ...config,
        withCredentials: true
      }
    )
  // Add put, delete, etc. as needed
};
