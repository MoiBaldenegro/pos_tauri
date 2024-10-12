import { create } from "zustand";
import { getBillServices } from "../services/bill.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  getBills: () => Promise<void>;
  billsArray: [];
}

export const updateBillProps = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,

    getBills: async () => {
      set({ isLoading: true });
      try {
        const res = await getBillServices();
        if (!res.data) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, billsArray: res.data });
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    billsArray: [],
  };
});
// aca continuamos, tenemo sque meter las claves para el nombre yu comentarios opcionales en el esquema de notas y
// agregar las notas despues ya de haberlas creado filtrando las que ya tienen asignado un ID por que ya estan creadas, para solo crear las agregadas nuevamente.
