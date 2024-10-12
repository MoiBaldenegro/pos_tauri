import axios from "../configs/axios";
import { MODIFIERS_PATH } from "../lib/routes.paths.lib";

export const getModifiesServices = async () => {
  const response = await axios(MODIFIERS_PATH);
  return response;
};
