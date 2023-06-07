import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newProductCategory = async (values) => {
  return await axios.post(`${apiRoutes.productCategory}`, values);
};

export const getProductCategories = async () => {
  return await axios.get(`${apiRoutes.productCategory}`);
};

export const getProductCategoryById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.get(`${apiRoutes.productCategory}/${id}`);
};

export const updateProductCategory = async (values) => {
  return await axios.put(`${apiRoutes.productCategory}`, values);
};

export const deleteProductCategory = async ({ queryKey }) => {
  return await axios.delete(`${apiRoutes.productCategory}`);
};