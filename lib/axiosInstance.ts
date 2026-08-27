import axios from 'axios';
import Cookies from 'js-cookie';
import { notifyError } from './notificationService';

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7019/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAxios = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: unknown,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// =================================================================
// 1. İSTEK (REQUEST) ARAYA GİRİCİSİ
// =================================================================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =================================================================
// 2. YANIT (RESPONSE) ARAYA GİRİCİSİ
// =================================================================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await refreshAxios.post("/Auth/refresh-token", { 
          token: refreshToken 
        });

        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        Cookies.set("accessToken", newAccessToken, { secure: true, sameSite: "strict" });
        Cookies.set("refreshToken", newRefreshToken, { secure: true, sameSite: "strict" });

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    let errorMessage = "Beklenmeyen bir hata oluştu.";

    if (error.response?.data) {
      const data = error.response.data;

      if (Array.isArray(data.errorMessage) && data.errorMessage.length > 0) {
        errorMessage = data.errorMessage[0];
      }
      else if (Array.isArray(data.errors) && data.errors.length > 0) {
        errorMessage = data.errors[0];
      } 
      else if (Array.isArray(data.Errors) && data.Errors.length > 0) {
        errorMessage = data.Errors[0];
      }
      else if (data.errors && typeof data.errors === 'object') {
        const firstKey = Object.keys(data.errors)[0]; 
        errorMessage = data.errors[firstKey][0];      
      }
      else if (data.message) {
        errorMessage = data.message;
      } 
      else {
        errorMessage = `API Hatası (${error.response.status})`;
      }
    } 
    else if (error.message) {
      errorMessage = "Sunucuya ulaşılamıyor veya Ağ hatası.";
    }
    if (error.response?.status !== 401) {
       notifyError(errorMessage);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;