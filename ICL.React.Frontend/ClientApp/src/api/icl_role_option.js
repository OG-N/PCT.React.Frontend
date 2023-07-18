import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newicl_role_option = async (values) => {
  return await axios.post(`${apiRoutes.icl_role_option_create}`, values);
};
export const newicl_role_option_batch = async (values) => {
    return await axios.post(`${apiRoutes.icl_role_option_create_batch}`, values);
};

export const updateicl_role_option = async (values) => {
    return await axios.post(`${apiRoutes.icl_role_option_update}`, values);
};
export const updateicl_role_option_batch = async (values) => {
    return await axios.post(`${apiRoutes.icl_role_option_update_batch}`, values);
};


export const deleteicl_role_option = async (values) => {
    return await axios.post(`${apiRoutes.icl_role_option_delete}` + "/" + values);
};


export const geticl_role_option = async () => {
    return await axios.get(`${apiRoutes.icl_role_option}`);
};
export const geticl_role_option_byid = async (values) => {
    return await axios.get(`${apiRoutes.icl_role_option_byid}` + "/" + values);
};
export const geticl_role_option_byrole = async (values) => {
    return await axios.get(`${apiRoutes.icl_role_option_byrole}` + "/" + values);
};
export const geticl_role_option_byoption = async (values) => {
    return await axios.get(`${apiRoutes.icl_role_option_byoption}` + "/" + values);
};
