import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newicl_user_role = async (values) => {
  return await axios.post(`${apiRoutes.icl_user_role_create}`, values);
};
export const newicl_user_role_batch = async (values) => {
    return await axios.post(`${apiRoutes.icl_user_role_create_batch}`, values);
};
export const updateicl_user_role = async (values) => {
    return await axios.post(`${apiRoutes.icl_user_role_update}`, values);
};
export const updateicl_user_role_batch = async (values) => {
    return await axios.post(`${apiRoutes.icl_user_role_update_batch}`, values);
};
export const deleteicl_user_role = async (values) => {
    return await axios.post(`${apiRoutes.icl_user_role_delete}` + "/" + values);
};


export const geticl_user_role = async () => {
  return await axios.get(`${apiRoutes.icl_user_role}`);
};
export const geticl_user_role_byid = async (values) => {
    return await axios.get(`${apiRoutes.icl_user_role_byid}` + "/" + values);
};
export const geticl_user_role_byuser = async (values) => {
    return await axios.get(`${apiRoutes.icl_user_role_byuser}` + "/" + values);
};
export const geticl_user_role_byrole = async (values) => {
    return await axios.get(`${apiRoutes.icl_user_role_byrole}` + "/" + values);
};

