import axios from "axios";
import { getSession } from "next-auth/react";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("1- BaseURL:", axiosClient.defaults.baseURL);

axiosClient.interceptors.request.use(
  async (config) => {
    console.log("2- BaseURL:", axiosClient.defaults.baseURL);
    const session = await getSession();

    config.headers["x-origin"] =
      process.env.NEXT_PUBLIC_ORIGIN ?? process.env.ORIGIN ?? "";
    config.headers["x-client-id"] =
      process.env.NEXT_PUBLIC_CLIENT_ID ?? process.env.CLIENT_ID ?? "";

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = "API request failed";

    if (error.response?.data?.message) {
      message = error.response.data.message;
    }

    console.error("API Error:", message);

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
