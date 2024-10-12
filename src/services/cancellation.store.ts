import axios from "../configs/axios";
import { CANCELLATIONS_PATH, PRODUCTS_PATH } from "../lib/routes.paths.lib";

export const cancelBillService = async (body: any) => {
  const response = await axios.post(CANCELLATIONS_PATH, body);
  return response;
};

export const cancelProductService = async (args: any) => {
  const response = await axios.post(
    `${CANCELLATIONS_PATH}${PRODUCTS_PATH}`,
    args
  );
  return response;
};
