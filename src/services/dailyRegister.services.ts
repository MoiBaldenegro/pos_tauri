import axios from "../configs/axios";
import { DAILY_REGISTER_PATH } from "../lib/routes.paths.lib";

export const createEntryService = (employeeNumber: number, pinPos: number) => {
  const body = {
    employeeNumber,
    pinPos,
  };
  const response = axios.post(DAILY_REGISTER_PATH, body);
  return response;
};
