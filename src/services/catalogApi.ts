import axiosClient from "./interceptedAxios";

export const catalogApi = axiosClient.create({
  baseURL: import.meta.env.VITE_CATALOG_SERVICE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
