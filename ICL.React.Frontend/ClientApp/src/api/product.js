import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newProduct = async (values) => {
  return await axios.post(`${apiRoutes.product}`, values);
};

export const getProducts = async () => {
  return await axios.get(`${apiRoutes.product}`);
};