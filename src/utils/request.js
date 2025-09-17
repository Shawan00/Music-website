import { clientRefreshToken } from '@/services/Auth/authService';
import axios from 'axios';

const preAIP = "https://projectmusic.onrender.com/";

const api = axios.create();
api.defaults.baseURL = preAIP
api.defaults.withCredentials = true

export const refreshInstance = axios.create();
refreshInstance.defaults.baseURL = preAIP
refreshInstance.defaults.withCredentials = true

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
  if (
    error.response &&
    error.response.status === 401 &&
    !error.config._retry
  ) {
    const originalRequest = error.config;
    originalRequest._retry = true;
    try {
      const res = await clientRefreshToken();
      console.log(res)
      const { accessToken } = res.data;
      localStorage.setItem('accessToken', accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return api(originalRequest);
    } catch (error) {
      // console.error('Refresh token failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      // window.location.href = "/login";
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

async function request(endpoint, method, data = null) {
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
    // console.log("API Erorr: ", error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { message: "An error occurred" }
    }
  }
}

export const get = (endpoint, params = {}) => request(endpoint, "GET", params);
export const post = (endpoint, data) => request(endpoint, "POST", data);
export const put = (endpoint, data) => request(endpoint, "PUT", data);
export const patch = (endpoint, data) => request(endpoint, "PATCH", data);
export const del = (endpoint) => request(endpoint, "DELETE");