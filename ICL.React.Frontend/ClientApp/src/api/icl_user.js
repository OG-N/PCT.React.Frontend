import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newicl_user = async (values) => {
  return await axios.post(`${apiRoutes.icl_user_create}`, values);
};

export const updateicl_user = async (values) => {
    return await axios.post(`${apiRoutes.icl_user_update}`, values);
};
export const deleteicl_user = async (values) => {
    return await axios.post(`${apiRoutes.icl_user_delete}` + "/" + values);
};


export const geticl_user = async () => {
  return await axios.get(`${apiRoutes.icl_user}`);
};
export const geticl_user_byid = async (values) => {
    return await axios.get(`${apiRoutes.icl_user_byid}` + "/" + values);
};
