import { Bill } from "../../../types/account";

export const updatePrices = (billCurrentCommand: Bill) => {
  return { ...billCurrentCommand, products: updatedPrices };
};
