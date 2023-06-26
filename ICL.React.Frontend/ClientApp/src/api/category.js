import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newCategory = async (values) => {
  return await axios.post(`${apiRoutes.category}`, values);
};

export const getCategories = async () => {
  return await axios.get(`${apiRoutes.category}`);
};

export const updateCategory = async (values) => {
  return await axios.put(`${apiRoutes.category}`, values);
};

export const getCategoryById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.get(`${apiRoutes.category}/${id}`);
};

export const getCategoryByGroupId = async ({ queryKey }) => {
  const [, group] = queryKey;
  return await axios.get(`${apiRoutes.category}/categories-by-group/${group}`);
};