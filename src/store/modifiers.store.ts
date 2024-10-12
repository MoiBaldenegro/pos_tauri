import { create } from "zustand";
import { getModifiesServices } from "../services/modifiers.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  modifiersArray: [];
  getModifiers: () => Promise<void>;
}

export const useModifiersStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    modifiersArray: [],
    getModifiers: async () => {
      set({ isLoading: true });
      try {
        const res = await getModifiesServices();
        const data = res.data;
        if (!data) {
          set({ isLoading: false, errors: true });
          throw new Error("No se pudieron traer modificadores");
        }
        set({ isLoading: false, modifiersArray: data });
        return data;
      } catch (error) {
        set({ isLoading: false, errors: true });
        throw new Error(
          `Ha ocurrido alñgo inesperado. Mas informacion: ${error}`
        );
      }
    },
  };
});
