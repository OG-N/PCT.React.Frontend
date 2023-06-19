import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newVendor = async (values) => {
  return await axios.post(`${apiRoutes.vendor}`, values);
};

export const getVendors = async () => {
  return await axios.get(`${apiRoutes.vendor}`);
};

export const updateVendor = async (values) => {
  return await axios.put(`${apiRoutes.vendor}`, values);
};

export const getVendorById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.get(`${apiRoutes.vendor}/${id}`);
};