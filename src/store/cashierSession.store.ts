import { pauseResumeSessionService } from "@/services/cashierServices";
import { create } from "zustand";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  pauseResumeSession: (id: string) => Promise<void>;
}

export const useCashierSession = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    pauseResumeSession: async (id: string) => {
      console.log(id);
      set({ isLoading: true });
      try {
        await pauseResumeSessionService(id);
        set({ isLoading: false, errors: false, message: null });
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
  };
});
