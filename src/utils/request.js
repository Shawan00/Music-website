import axios from 'axios';

const preAIP = "http://localhost:3000/";

const api = axios.create({
  baseURL: preAIP,
  headers: {
    "Content-Type": "application/json",
  },
});

async function request(endpoint, method, data = null, headers = {}) {
  try {
    let config = {
      url: endpoint,
      method,
      headers: { ...api.defaults.headers, ...headers}
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
    throw error.response?.data || error.message;
  }
}

export const get = (endpoint, params = {}) => request(endpoint, "GET", params);
export const post = (endpoint, data, headers) => request(endpoint, "POST", data, headers);
export const put = (endpoint, data, headers) => request(endpoint, "PUT", data, headers);
export const patch = (endpoint, data, headers) => request(endpoint, "PATCH", data, headers);
export const del = (endpoint) => request(endpoint, "DELETE");