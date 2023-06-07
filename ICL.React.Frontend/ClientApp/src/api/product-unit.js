import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newProductUnit = async (values) => {
  return await axios.post(`${apiRoutes.productUnit}`, values);
};

export const getProductUnits = async () => {
  return await axios.get(`${apiRoutes.productUnit}`);
};

export const getProductUnitById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.get(`${apiRoutes.productUnit}/${id}`);
};

export const updateProductUnit = async (values) => {
  return await axios.put(`${apiRoutes.productUnit}`, values);
};

export const deleteProductUnit = async ({ queryKey }) => {
  return await axios.delete(`${apiRoutes.productUnit}`);
};