export interface Transaction {
  paymentType: string;
  quantity: string;
  payQuantity?: string;
  tips?: string;
}

export interface Payment {
  accountId: string;
  check: string;
  noteCode?: string;
  checkTotal: string;
  tips?: string;
  transactions: Transaction[];
  paymentTotal: string;
  cashier: string;
  paymentDate: string;
  billing: boolean;
  difference: string;
}
