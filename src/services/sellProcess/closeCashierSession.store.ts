import { create } from "zustand";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  closeSession: (id: string, body: {}) => Promise<void>;
}

const useOperationProcess = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    closeSession: async () => {
      set({ isLoading: true });
      // aca seguimos con la store para hacer el corte del cajero
    },
  };
});
