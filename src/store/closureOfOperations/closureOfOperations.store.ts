import { closureOfOperationsService } from "@/services/closuresOfOperations/closureOfOperations.service";
import { create } from "zustand";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;

  closeCashierSession: (data: any) => void;
}

export const useClosureOfOperationsStore = create<state>((set) => ({
  isLoading: false,
  errors: false,
  message: null,

  closeCashierSession: async (data) => {
    set({ isLoading: true });
    try {
      const res = await closureOfOperationsService(data);
      if (!res.data.success) {
        set({ isLoading: false, errors: true, message: "Error" });
      }
      set({ isLoading: false, message: "Success" });
    } catch (error) {
      set({ isLoading: false, errors: true, message: "Error" });
    }
  },
}));
