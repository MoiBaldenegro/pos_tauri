import axios from "../../configs/axios";
import { OPERATING_PERIOD_CURRENT } from "../../lib/routes.paths.lib";

export const getCurrentProcessService = async () => {
  const response = axios(OPERATING_PERIOD_CURRENT);
  return response;
};
