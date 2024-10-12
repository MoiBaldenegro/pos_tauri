import { create } from "zustand";
import { createEntryService } from "../services/dailyRegister.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string;
  createEntryDaily: (employeeNumber: number, pinPos: number) => Promise<void>;
}

export const useEntryDaily = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    createEntryDaily: async (employeeNumber, pinPos) => {
      set({ isLoading: true });
      try {
        const res = await createEntryService(employeeNumber, pinPos);
        if (!res.data) {
          console.log(res);
          set({ isLoading: false, errors: true });
        }
        const newMessage = new Date().toLocaleTimeString().slice(0, 8);
        set({ isLoading: false, message: newMessage });
        return res.data;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    message: "No vino nada",
  };
});
