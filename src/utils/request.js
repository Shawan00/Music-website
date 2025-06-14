import { adminRefreshToken } from '@/services/Auth/authService';
import axios from 'axios';

const preAIP = "http://localhost:3000/";

const api = axios.create();
api.defaults.baseURL = preAIP
api.defaults.withCredentials = true

//thêm interceptors cho request
api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken && config.headers){
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// thêm interceptors cho response
api.interceptors.response.use(function (response) {
  // Do nothing with response data
  return response;
}, async function (error) {
  if (!error.config._retry) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    
    const originalRequest = error.config;
    error.config._retry = true;
    try {
      const res = userInfo.type === 'admin' ? await adminRefreshToken() : "user"
      const { accessToken } = res.data;

      localStorage.setItem('accessToken', accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return api(originalRequest);
    } catch (error) {
      console.error('Refresh token failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = user.role === "admin" ? "/admin/login" : "/login";
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

async function request(endpoint, method, data = null, headers = {}) {
  try {
    let config = {
      url: endpoint,
      method
    };

    if (method === "GET") {
      config.params = data;
    } else {
      if (data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      }
      config.data = data;
    }

    const response = await api(config);
    return response;
  } catch (error) {
    console.log("API Erorr: ", error);
    return {
      data: {
        code: error.response?.status || error.code || 500,
        message: error.response?.data?.message || error.message || 'Unknown error',
      },
      detail: error.response?.data?.details || null
    }
  }
}

export const get = (endpoint, params = {}) => request(endpoint, "GET", params);
export const post = (endpoint, data, headers) => request(endpoint, "POST", data, headers);
export const put = (endpoint, data, headers) => request(endpoint, "PUT", data, headers);
export const patch = (endpoint, data, headers) => request(endpoint, "PATCH", data, headers);
export const del = (endpoint) => request(endpoint, "DELETE");