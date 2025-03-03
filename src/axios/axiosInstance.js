import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api/v1`,
  withCredentials: true,
});

export { axiosInstance };
