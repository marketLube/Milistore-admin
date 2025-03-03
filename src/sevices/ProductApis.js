import { axiosInstance } from "../axios/axiosInstance";

export const listProducts = (page) => {
  return axiosInstance.get(`product/get-products?page=${page}`);
};

export const addProduct = (formData) => {
  return axiosInstance.post("product/addproduct", formData);
};
