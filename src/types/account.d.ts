import { Payment } from "./payment";
import { Product } from "./products";

export interface Printer {
  printerName: string;
  tcp: string;
}

export interface Bill {
  sellType?: string;
  user?: string;
  userId?: string;
  checkTotal?: string;
  products?: Product[];
  status?: "enable" | "free" | "forPayment" | "pending";
  payment?: Payment[];
  tableNum?: string;
  table?: string | undefined;
  accountId?: string;
  operatingPeriod?: string;
  diners?: number;
}
