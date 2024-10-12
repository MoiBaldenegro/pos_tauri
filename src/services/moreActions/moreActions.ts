import { calculateDiscount } from "@/lib/calculateDiscount";
import axios from "../../configs/axios";
import {
  BILLS_PATH,
  DISCOUNTS_PATH,
  TABLES_UPT_PATH,
  TRANSFER_PRODUCTS_PATH,
} from "../../lib/routes.paths.lib";
import { parse } from "uuid";

export const SaveBillInTableService = async (id: string, data: {}) => {
  const response = await axios.put(`${TABLES_UPT_PATH}/${id}`, data);
  return response;
};

export const UpdatePropInBillService = async (id: string, data: {}) => {
  const response = await axios.put(`${BILLS_PATH}/${id}`, data);
  return response;
};

interface Data {
  case: string;
  receivingBill: any;
  sendBill: any;
}

export const productsToBillServices = async (data: Data) => {
  const response = await axios.put(
    `${BILLS_PATH}${TRANSFER_PRODUCTS_PATH}`,
    data
  );
  return response;
};

export const createDiscountService = async (data: any) => {
  const discount = data.body;
  const totalAfterDiscount = calculateDiscount(
    parseFloat(discount.cost),
    parseFloat(discount.discountMount),
    discount.setting
  );

  const updateBody = {
    ...discount,
    totalDiscountQuantity: totalAfterDiscount,
  };

  const { cost, ...discountBody } = updateBody;

  const dataToSend = {
    ...data,
    body: discountBody,
  };

  const response = await axios.post(DISCOUNTS_PATH, dataToSend);
  return response;
};

export const deleteDiscountService = async (id: string, body: any) => {
  const response = await axios.put(`${DISCOUNTS_PATH}/d/${id}`, body);
  return response;
};

export const deleteNoteProductDiscounService = async (
  id: string,
  body: any
) => {
  const response = await axios.put(`${DISCOUNTS_PATH}/d/note/${id}`, body);
  return response;
};

export const deleteBillProductDiscounService = async (
  id: string,
  body: any
) => {
  const response = await axios.put(`${DISCOUNTS_PATH}/d/bill/${id}`, body);
  return response;
};
