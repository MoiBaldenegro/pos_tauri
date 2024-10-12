import { Bill } from "../account";

export interface CashierBoxProps {
  openModal: () => void;
  item: Bill;
  route: string;
  setting: React.Dispatch<React.SetStateAction<Bill | undefined>>;
  isNote?: any;
}
