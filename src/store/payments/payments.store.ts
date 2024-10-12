// crearemos una store para manejar los pagos togo
import {
  paymentPhoneService,
  paymentRappiService,
  paymentsService,
} from "@/services/payments/paymentNote.services";
import {
  mojeCalculateService,
  payTipService,
} from "@/services/payments/payments.services";
import { create } from "zustand";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  payTogo: (data: { waiterId: string; body: {} }) => Promise<void>;
  payRappi: (data: { waiterId: string; body: {} }) => Promise<void>;
  payPhone: (data: { waiterId: string; body: {} }) => Promise<void>;
  payTips: (id: string, body: any) => Promise<void>;
  mojeCalculate: (body: any) => Promise<void>;
}

export const usePayStore = create<state>((set) => ({
  isLoading: false,
  errors: false,
  message: null,
  payTogo: async (data: any) => {
    set({ isLoading: true });
    try {
      const res = await paymentsService(data);
      set({ isLoading: false, message: "Pago exitoso" });
      return res.data;
    } catch (error) {
      set({
        isLoading: false,
        errors: true,
        message: "Error al realizar el pago",
      });
    }
  },

  payTips: async (id: string, body: any) => {
    set({ isLoading: true });
    try {
      const res = await payTipService(id, body);
      set({ isLoading: false, message: "Pago exitoso" });
      return res;
    } catch (error) {
      set({
        isLoading: false,
        errors: true,
        message: "Error al realizar el pago",
      });
    }
  },

  mojeCalculate: async (body: any) => {
    set({ isLoading: true });
    try {
      const res = await mojeCalculateService(body);
      set({ isLoading: false, message: "Pago exitoso" });
      return res;
    } catch (error) {
      set({
        isLoading: false,
        errors: true,
        message: "Error al realizar el pago",
      });
    }
  },

  payRappi: async (data: any) => {
    set({ isLoading: true });
    try {
      const res = await paymentRappiService(data);
      set({ isLoading: false, message: "Pago exitoso" });
      return res.data;
    } catch (error) {
      set({
        isLoading: false,
        errors: true,
        message: "Error al realizar el pago",
      });
    }
  },
  payPhone: async (data: any) => {
    set({ isLoading: true });
    try {
      const res = await paymentPhoneService(data);
      set({ isLoading: false, message: "Pago exitoso" });
      return res.data;
    } catch (error) {
      set({
        isLoading: false,
        errors: true,
        message: "Error al realizar el pago",
      });
    }
  },
}));
