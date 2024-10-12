import axios from "@/configs/axios";
import { PAYMENTS_PATH, REPORTS_PATH } from "@/lib/routes.paths.lib";

export const payTipService = async (id: string, body: any) => {
  const response = await axios.post(`${PAYMENTS_PATH}/pay/tips/${id}`, body);
  return response.data;
};

export const mojeCalculateService = async (body: any) => {
  const response = await axios.post("reports/moje-report", body);
  return response.data;
};
