import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newProduct = async (values) => {
  return await axios.post(`${apiRoutes.product}`, values);
};

export const getProducts = async () => {
  return await axios.get(`${apiRoutes.product}`);
};

export const getProductById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.get(`${apiRoutes.product}/${id}`);
};

export const updateProduct = async (values) => {
  return await axios.put(`${apiRoutes.product}`, values);
};

export const deleteProductById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.delete(`${apiRoutes.product}/${id}`);
};