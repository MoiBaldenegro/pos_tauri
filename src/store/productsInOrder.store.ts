import { ON_SITE_ORDER } from "@/lib/orders.lib";
import { Bill } from "../types/account";
import { create } from "zustand";

interface state {
  BillCommandCurrent: Bill;
  setState: (form: Bill) => void;
}

export const useCurrentCommand = create<state>((set) => {
  // Typescript va a fallar cuando mandes para el pedido para llevar, por que tiene menos keys que un pedido normal.
  return {
    BillCommandCurrent: {
      user: "Moises",
      checkTotal: "0.00",
      products: [],
      status: "enable",
      tableNum: "s/N",
      table: undefined,
    },
    setState: (form: Bill) => {
      const checkTotalNew = form?.products
        .reduce(
          (a, b) =>
            a + parseFloat(b.quantity > 1 ? b.priceInSiteBill : b.priceInSite),
          0
        )
        .toFixed(2)
        .toString();

      const actualyForm = { ...form, checkTotal: checkTotalNew };
      set({ BillCommandCurrent: actualyForm });
    },
  };
});
