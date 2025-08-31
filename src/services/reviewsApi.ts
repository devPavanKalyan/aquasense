import axiosClient from "./interceptedAxios";

export const reviewsApi = axiosClient.create({
  baseURL: import.meta.env.VITE_REVIEWS_SERVICE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
