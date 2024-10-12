import axios from "@/configs/axios";
import { TOGO_ORDER_PATH } from "../../lib/routes.paths.lib";

export interface ToGoOrder {}

export const createToGoOrderService = async (body: ToGoOrder) => {
  const response = await axios.post(TOGO_ORDER_PATH, body);
  return response;
};

export const getToGoOrdersService = async () => {
  const response = await axios(TOGO_ORDER_PATH);
  return response;
};

export const updateToGoOrder = async (id: string, body: any) => {
  const response = axios.put(`${TOGO_ORDER_PATH}/${id}`, body);
  return response;
};
