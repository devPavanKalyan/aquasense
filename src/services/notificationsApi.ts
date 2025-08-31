import axiosClient from "./interceptedAxios";

export const notificationsApi = axiosClient.create({
  baseURL: import.meta.env.VITE_NOTIFICATIONS_SERVICE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
