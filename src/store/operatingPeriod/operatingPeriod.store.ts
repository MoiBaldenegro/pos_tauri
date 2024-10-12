import { create } from "zustand";
import { getCategoriesService } from "../../services/categories.services";
import { getCurrentProcessService } from "../../services/operatingPeriod/operatingProcess.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  messages: string;
  operatingPeriod: any[];
  getCurrentPeriod: () => Promise<void>;
  totalSells: () => Promise<void>;
}

export const useOperationProcess = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    messages: "",
    operatingPeriod: [],
    getCurrentPeriod: async () => {
      set({ isLoading: true });
      try {
        const res = await getCurrentProcessService();
        console.log("res", res.data);
        set({ operatingPeriod: res.data, isLoading: false, errors: false });
        return res.data;
      } catch (error) {
        set({
          messages: "No se pudieron traer los reportes",
          isLoading: false,
        });
      }
    },

    totalSells: async () => {
      set({ isLoading: true });
      try {
        const res = await getCurrentProcessService();
        set({ operatingPeriod: res.data, isLoading: false });
        const currentPeriod = res.data[0];
      } catch (error) {
        set({
          messages: "No se pudieron traer los reportes",
          isLoading: false,
        });
      }
    },
  };
});
