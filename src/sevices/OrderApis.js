import { axiosInstance } from "../axios/axiosInstance";

export const getOrders = () => {
  return axiosInstance
    .get("/order/get-orders")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
