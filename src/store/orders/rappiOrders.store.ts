import {
  createRappiOrderService,
  getRappiOrdersService,
  updateRappi,
} from "@/services/orders/rappiOrders.services";
import { create } from "zustand";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  rappiOrdersArray: [];
  getOrders: () => Promise<void>;
  createNewOrder: (body: any) => Promise<void>;
  updateOrder: (id: string, body: any) => Promise<void>;
}

export const useRappiOrders = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    rappiOrdersArray: [],
    getOrders: async () => {
      set({ isLoading: true });
      try {
        const res = await getRappiOrdersService();
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se encontraron ordenes",
          });
          throw new Error(`No se encontraron ordenes`);
        }
        set({ isLoading: false, rappiOrdersArray: res.data });
        return res;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `Ha ocurrido un error inesperado`,
        });
      }
    },

    createNewOrder: async (body) => {
      set({ isLoading: true });
      try {
        const res = await createRappiOrderService(body);
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: `No se pudo crear la orden`,
          });
          throw new Error(`No se pudo generar la orden`);
        }
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `Ha ocurrido un error inesperado.`,
        });
        console.error(error);
      }
    },

    updateOrder: async (id, body) => {
      set({ isLoading: true });
      try {
        const res = await updateRappi(id, body);
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: `No se pudo actualizar la cuenta`,
          });
          throw new Error(`No se pudo actualizar esta orden`);
        }
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `No se pudo actualizar la cuenta.`,
        });
        console.error(error);
      }
    },
  };
});
