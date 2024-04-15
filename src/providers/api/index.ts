import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_DAPP_API_URL;

const API = axios.create({
  baseURL: apiUrl,
});
export default API;

API.interceptors.request.use(
  (config) => {
    // Modify the request configuration before sending it
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // console.log(error);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);
