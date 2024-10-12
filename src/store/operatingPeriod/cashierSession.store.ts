import { create } from "zustand";
import {
  createCashierSession,
  getCashierSession,
  updateBillForPayment,
} from "../../services/operatingPeriod/cashierSession.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  cashierSession: [];
  createSession: (quantity: string, id: string) => Promise<{}>;
  addBillForPayment: (id: string, body: {}) => Promise<void>;
  getSessions: () => Promise<void>;
}

export const useCashierSessionStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    cashierSession: [],
    createSession: async (quantity, id) => {
      set({ isLoading: true });
      try {
        const res = await createCashierSession(quantity, id);
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudo crear la session",
          });
        }
        set({ isLoading: false });
        return res.data;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `No se pudo crear la session. mas informacion: ${error}`,
        });
      }
    },
    addBillForPayment: async (id, body) => {
      set({ isLoading: true });
      try {
        const res = await updateBillForPayment(id, { bills: [body] });
        if (!res.data) {
          set({ isLoading: false, errors: true, message: "No se actualizo" });
        }
        set({ isLoading: false });
        return res.data;
      } catch (error) {
        set({ isLoading: false, errors: true, message: "No se actualizo" });
      }
    },
    getSessions: async () => {
      try {
        const res = await getCashierSession();
        set({ cashierSession: res.data });
      } catch (error) {
        console.error(error);
      }
    },
  };
});
