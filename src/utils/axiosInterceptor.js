import axios from 'axios';
import { Constant } from './constant/constant';

// Create axios instance
const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Constant.USER_TOKEN);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle token validation errors
      if (error.response.status === 401 || error.response.data?.error === "token not valid") {
        // Clear auth data
        localStorage.removeItem("userInfo");
        localStorage.removeItem(Constant.USER_INFO);
        localStorage.removeItem(Constant.USER_TOKEN);
        // Redirect to login page
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 