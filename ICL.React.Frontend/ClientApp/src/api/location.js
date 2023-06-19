import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newLocation = async (values) => {
  return await axios.post(`${apiRoutes.location}`, values);
};

export const getLocations = async () => {
  return await axios.get(`${apiRoutes.location}`);
};

export const getLocationById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.get(`${apiRoutes.location}/${id}`);
};

export const updateLocation = async (values) => {
  return await axios.put(`${apiRoutes.location}`, values);
};