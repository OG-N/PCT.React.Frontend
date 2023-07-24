import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newicl_role = async (values) => {
  return await axios.post(`${apiRoutes.icl_role_create}`, values);
};

export const updateicl_role = async (values) => {
    return await axios.post(`${apiRoutes.icl_role_update}`, values);
};
export const deleteicl_role = async (values) => {
    return await axios.post(`${apiRoutes.icl_role_delete}` + "/" + values);
};


export const geticl_role = async () => {
    return await axios.get(`${apiRoutes.icl_role}`);
};
export const geticl_role_byid = async (values) => {
    return await axios.get(`${apiRoutes.icl_role_byid}` + "/" + values);
};
export const geticl_role_byname = async (values) => {
    return await axios.get(`${apiRoutes.icl_role_byname}` + "/" + values);
};
