export interface Product {
  code: string;
  category: string;
  productName: string;
  priceInSite: string;
  priceToGo: string;
  priceCallOrder: string;
  priceDelivery: string;
  status: "disabled" | "enabled";
  quantity: number;
  priceInSiteBill: string;
  priceToGoBill: string;
  priceCallOrderBill: string;
  priceDeliveryBill: string;
  active: boolean;
}
