import { create } from "zustand";
import {
  getusersService,
  injectPropInUser,
  resetTablesInUsersService,
} from "../services/users.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  updateUser: (args: any, id: string) => Promise<void>;
  resetTables: () => Promise<void>;
  getUsers: () => Promise<void>;
  usersArray: any[];
}

export const useUsersStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    updateUser: async (args: any, id: string) => {
      set({ isLoading: true });
      try {
        const res = await injectPropInUser(args, id);
        if (!res) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, errors: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    resetTables: async () => {
      set({ isLoading: true });
      try {
        const res = await resetTablesInUsersService();
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    getUsers: async () => {
      set({ isLoading: true });
      try {
        const res = await getusersService();
        set({ isLoading: false, usersArray: res.data });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    usersArray: [],
  };
});
