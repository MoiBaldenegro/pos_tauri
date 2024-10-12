import { create } from "zustand";
import { paymentNoteService } from "../../services/payments/paymentNote.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  paymentNote: (id: string, body: any) => Promise<void>;
}

export const UsePaymentsStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    paymentNote: async (id, body) => {
      set({ isLoading: true });
      try {
        const res = await paymentNoteService(id, body);
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se realizo el pago",
          });
        }
        set({ isLoading: false });
        return res.data;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `No se pudo completar el pago debido a un error inesperado ${error}`,
        });
      }
    },
  };
});
