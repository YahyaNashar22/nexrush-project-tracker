import axios from "axios";
import useUserStore from "../context/userStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
