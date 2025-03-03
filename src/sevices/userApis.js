import { axiosInstance } from "../axios/axiosInstance";

export const listUsers = (page, limit) => {
  return axiosInstance.get(`/user/list?page=${page}&limit=${limit}`);
};
