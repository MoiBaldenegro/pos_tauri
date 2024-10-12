import { create } from "zustand";
import { signIn } from "../../services/auth/auth.services";
import { useNavigate } from "react-router-dom";
// aca seguiremos con la store de auth

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  loginRequest: (arg: any) => Promise<void>;
  authData: any;
  logOutRequest: () => void;
  isAuth: boolean;
}

export const useAuthStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    loginRequest: async (arg: any) => {
      set({ isLoading: true });
      try {
        const res = await signIn(arg);
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudo completar",
          });
        }
        set({ isLoading: false, authData: res.data, isAuth: true });
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `Has ocurrido algo inesperado ${error}`,
        });
      }
    },
    authData: {},

    logOutRequest: () => {
      set({
        authData: {},
        isLoading: false,
        errors: false,
        message: null,
        isAuth: false,
      });
    },
    isAuth: false,
  };
});
