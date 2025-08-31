import axiosClient from "./interceptedAxios";

export const searchApi = axiosClient.create({
  baseURL: import.meta.env.VITE_SEARCH_SERVICE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
