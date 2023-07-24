import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const newCMSContentLeadership = async (values) => {
    return await axios.post(`${apiRoutes.cmscontentleadership}`, values);
};
export const updateCMSContentLeadership = async (values) => {
    return await axios.post(`${apiRoutes.cmscontentleadershipupdate}`, values);
};

export const getCMSContentLeadership = async () => {
    return await axios.get(`${apiRoutes.cmscontentleadership}`);
};

export const getCMSContentLeadershipByID = async (values) => {
    if (values.queryKey[0] == undefined || values.queryKey[0].length <= 0) {
        return "";
    }
    return await axios.get(`${apiRoutes.cmscontentleadershipbyid}` + "/" + values.queryKey[0].id);
};

export const getCMSContentLeadershipByRol = async (values) => {
    if (values.queryKey[0] == undefined || values.queryKey[0].length <= 0) {
        return "";
    }
    return await axios.get(`${apiRoutes.cmscontentleadershipbyrol}` + "/" + values.queryKey[0]);
};

export const getCMSContentLeadershipByName = async (values) => {
    if (values.queryKey[0] == undefined || values.queryKey[0].length <= 0) {
        return "";
    }
    return await axios.get(`${apiRoutes.cmscontentleadershipbyname}` + "/" + values.queryKey[0]);
};