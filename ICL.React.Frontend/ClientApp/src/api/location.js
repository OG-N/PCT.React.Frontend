import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newLocation = async (values) => {
  return await axios.post(`${apiRoutes.product}`, values);
};

export const getLocationById = async (values) => {
  return await axios.get(`${apiRoutes.product}`, values);
};

export const updateLocation = async (values) => {
  return await axios.put(`${apiRoutes.product}`, values);
};