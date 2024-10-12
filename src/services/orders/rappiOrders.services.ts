import axios from "@/configs/axios";
import { RAPPI_ORDER_PATH } from "../../lib/routes.paths.lib";

export interface ToGoOrder {}

export const createRappiOrderService = async (body: ToGoOrder) => {
  const response = await axios.post(RAPPI_ORDER_PATH, body);
  return response;
};

export const getRappiOrdersService = async () => {
  const response = await axios(RAPPI_ORDER_PATH);
  return response;
};

export const updateRappi = async (id: string, body: any) => {
  const response = axios.put(`${RAPPI_ORDER_PATH}/${id}`, body);
  return response;
};
