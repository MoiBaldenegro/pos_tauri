import { create } from "zustand";
import { getReasonsAction } from "../services/cancellationReasons.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  reasonsArray: any[];
  getReasons: () => Promise<void>;
}

export const cancellationReasonStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    reasonsArray: [],
    getReasons: async () => {
      set({ isLoading: true });
      try {
        const res = await getReasonsAction();
        if (!res.data) {
          set({ isLoading: false, errors: true });
          return;
        }
        set({ isLoading: false, reasonsArray: res.data });
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
  };
});
