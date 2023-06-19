import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newCarrier = async (values) => {
  return await axios.post(`${apiRoutes.carrier}`, values);
};

export const getCarriers = async () => {
  return await axios.get(`${apiRoutes.carrier}`);
};

export const updateCarrier = async (values) => {
  return await axios.put(`${apiRoutes.carrier}`, values);
};

export const getCarrierById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.get(`${apiRoutes.carrier}/${id}`);
};

export const deleteCarrierById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.delete(`${apiRoutes.carrier}/${id}`);
};