import axios from "axios";
import { clearToken } from "../utils/auth";
const api = axios.create({
  baseURL: "https://exam-portal-system.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Logging out...");
      clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
