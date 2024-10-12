import { Payment } from "../../../types/payment";

export const initialState: Payment = {
  accountId: "",
  check: "example",
  checkTotal: "0.00",
  noteCode: "n/a",
  tips: "0.00",
  transactions: [],
  paymentTotal: "1016",
  cashier: "",
  paymentDate: "",
  billing: false,
  difference: "1016",
};

export const initialTransaction = {
  paymentType: "cash",
  quantity: "",
  payQuantity: "",
};
