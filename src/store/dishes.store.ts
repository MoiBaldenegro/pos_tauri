import { create } from "zustand";
import { getDishesService } from "../services/dishes.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  dishesArray: [];
  getDishes: () => Promise<void>;
}

export const useDishesStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    dishesArray: [],
    getDishes: async () => {
      set({ isLoading: true });
      try {
        const res = await getDishesService();
        if (!res.data) {
          set({ isLoading: false, errors: true });
          throw new Error("No se pudieron traer los complementos");
        }
        const data = res.data;
        set({ isLoading: false, dishesArray: data });
        return data;
      } catch (error) {
        set({ isLoading: false, errors: true });
        throw new Error(
          `Ha ocurrido algo inesperado. Mas informacion: ${error}`
        );
      }
    },
  };
});
