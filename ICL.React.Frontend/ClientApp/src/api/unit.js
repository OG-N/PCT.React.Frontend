import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newUnit = async (values) => {
  return await axios.post(`${apiRoutes.unit}`, values);
};

export const getUnits = async () => {
  return await axios.get(`${apiRoutes.unit}`);
};

export const updateUnit = async (values) => {
  return await axios.put(`${apiRoutes.unit}`, values);
};

export const getUnitById = async ({ queryKey }) => {
  const [, id] = queryKey;
  return await axios.get(`${apiRoutes.unit}/${id}`);
};

export const getUnitsByGroup = async ({ queryKey }) => {
  const [, group] = queryKey;
  return await axios.get(`${apiRoutes.unit}/units-by-group/${group}`);
};