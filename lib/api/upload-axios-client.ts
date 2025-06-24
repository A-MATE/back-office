import axios from "axios";

const uploadAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL,
  timeout: 10000,
});

export default uploadAxiosClient;
