import { create } from "zustand";
import { cashWithdrawalService } from "./closureOfOperations.service";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  cashWithdrawal: (body: any) => Promise<void>;
}

export const useCashWithdrawalStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    cashWithdrawal: async (body) => {
      set({ isLoading: true });
      try {
        const res = await cashWithdrawalService(body);
        set({ isLoading: false });
        return;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `Ha ocurrido algo inesperado`,
        });
        console.error(
          `Ha ocurrido algo inesperado: mas informacion del error: ${error}`
        );
      }
    },
  };
});
