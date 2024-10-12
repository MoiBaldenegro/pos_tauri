import axios from "../configs/axios";
import { CANCELLATION_REASON_PATH } from "../lib/routes.paths.lib";

export const getReasonsAction = async () => {
  const response = await axios(CANCELLATION_REASON_PATH);
  return response;
};
