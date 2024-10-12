import axios from "../configs/axios";
import { CATEGORIES_PATH } from "../lib/routes.paths.lib";

export const getCategoriesService = async () => {
  const response = axios(CATEGORIES_PATH);
  return response;
};
