import axios from "../configs/axios";
import { DISHES_PATH } from "../lib/routes.paths.lib";

export const getDishesService = async () => {
  const response = await axios(DISHES_PATH);
  return response;
};
