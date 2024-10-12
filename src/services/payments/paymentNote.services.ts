import axios from "../../configs/axios";
import { PAYMENTS_PATH, PAYMENT_NOTES_PATH } from "../../lib/routes.paths.lib";

export const paymentNoteService = async (id: string, body: any) => {
  const response = axios.post(`${PAYMENT_NOTES_PATH}/${id}`, body);
  return response;
};

interface TogoPayment {
  waiterId: string;
  body: {};
}

export const paymentsService = async (data: TogoPayment) => {
  console.log(data);
  const response = axios.post(`${PAYMENTS_PATH}/togo/pay`, data);
  return response;
};

export const paymentRappiService = async (data: TogoPayment) => {
  console.log(data);
  const response = axios.post(`${PAYMENTS_PATH}/rappi/pay`, data);
  return response;
};

export const paymentPhoneService = async (data: TogoPayment) => {
  console.log(data);
  const response = axios.post(`${PAYMENTS_PATH}/phone/pay`, data);
  return response;
};

// REVISAR SI ACA NOS QUEDAMOS - AL PARECER TRABAJABAMOS EN LOCAL UNA VES TEMRINADO MIGRAR AL NUEVO BACKEND
