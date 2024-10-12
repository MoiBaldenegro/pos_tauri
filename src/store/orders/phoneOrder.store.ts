import {
  createPhoneOrderService,
  getPhoneOrdersService,
  updatePhone,
} from "@/services/orders/phoneOrders.services";
import { create } from "zustand";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  phoneOrdersArray: [];
  getOrders: () => Promise<void>;
  createNewOrder: (body: any) => Promise<void>;
  updateOrder: (id: string, body: any) => Promise<void>;
}

export const usePhoneOrders = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    phoneOrdersArray: [],
    getOrders: async () => {
      set({ isLoading: true });
      try {
        const res = await getPhoneOrdersService();
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se encontraron ordenes",
          });
          throw new Error(`No se encontraron ordenes`);
        }
        set({ isLoading: false, phoneOrdersArray: res.data });
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
        const res = await createPhoneOrderService(body);
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
        const res = await updatePhone(id, body);
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
