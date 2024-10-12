import axios from "../../configs/axios";
import { CASHIER_SESSION_PATH } from "../../lib/routes.paths.lib";

export const createCashierSession = async (quantity: string, id: string) => {
  const data = { initialQuantity: quantity, user: id };
  const response = axios.post(CASHIER_SESSION_PATH, data);
  return response;
};

export const updateBillForPayment = async (id: string, body: any) => {
  const response = axios.put(`${CASHIER_SESSION_PATH}/payment/${id}`, body);
  return response;
};

export const getCashierSession = async () => {
  const response = await axios(CASHIER_SESSION_PATH);
  return response;
};
