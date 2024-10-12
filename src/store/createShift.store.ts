import { create } from "zustand";

interface state {
  isLoading: boolean;
  errors: boolean;
  createShiftRequest: (arg: any) => Promise<void>;
}

export const useDailyRegister = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    createShiftRequest: async (arg: any) => {
      try {
        set({ isLoading: true });
      } catch (error) {}
    },
  };
});
