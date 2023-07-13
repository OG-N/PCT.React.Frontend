import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const getDashboardStatistics = async () => {
    return await axios.get(`${apiRoutes.dashboard}`);
};
