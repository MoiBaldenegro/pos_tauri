import { create } from "zustand";
import { getCategoriesService } from "../services/categories.services";

type Category = {
  _id: string;
  code: string;
  categoryName: string;
  subCategories: string[];
  parentCategory: string | null;
  status: "enabled" | "disabled";
  createdAt: string;
  updatedAt: string;
};

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  getCategories: () => Promise<void>;
  categoriesArray: Category[];
}

export const useCategoriesStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    getCategories: async () => {
      set({ isLoading: true });
      try {
        const res = await getCategoriesService();
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudieron traer las categorias",
          });
          throw new Error("No se pudieron traer las categorias");
        }
        set({ isLoading: false, categoriesArray: res.data });
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
    categoriesArray: [],
  };
});
