import axios from "../configs/axios";
import { PRODUCTS_PATH } from "../lib/routes.paths.lib";

export const getProductsService = async () => {
  const response = axios(PRODUCTS_PATH);
  return response;
};

export const disableProductService = async (id: string, body: {}) => {
  const response = axios.put(`${PRODUCTS_PATH}/${id}`, body);
  return response;
};
