import axios from "@/configs/axios";
import { PHONE_ORDER_PATH } from "@/lib/routes.paths.lib";

export interface ToGoOrder {}

export const createPhoneOrderService = async (body: ToGoOrder) => {
  const response = await axios.post(PHONE_ORDER_PATH, body);
  return response;
};

export const getPhoneOrdersService = async () => {
  const response = await axios(PHONE_ORDER_PATH);
  return response;
};

export const updatePhone = async (id: string, body: any) => {
  const response = axios.put(`${PHONE_ORDER_PATH}/${id}`, body);
  return response;
};
