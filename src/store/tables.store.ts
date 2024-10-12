import { create } from "zustand";
import {
  UpdateTable,
  enableTableService,
  getTablesService,
  joinTablesService,
  resetTablesService,
  splitTablesService,
  updateTablesService,
} from "../services/tables";
import { resetTablesInUsersService } from "../services/users.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  tablesArray: [];
  getTables: () => Promise<void>;
  updateTables: (args: UpdateTable[], userId: string) => Promise<void>;
  resetTables: () => Promise<void>;
  joinTables: (body: any) => Promise<void>;
  splitTables: (id: string) => Promise<void>;
  enableTable: (id: string, body: any) => Promise<void>;
}

export const UseTableStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    tablesArray: [],
    getTables: async () => {
      set({ isLoading: true });
      try {
        const response = await getTablesService();
        if (!response.data) {
          set({ isLoading: false, errors: true });
        }
        set({ tablesArray: response.data });
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    updateTables: async (arg, userId) => {
      set({ isLoading: true });
      try {
        const res = await updateTablesService(arg, userId);
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
        const [res, response] = await Promise.all([
          resetTablesService(),
          resetTablesInUsersService(),
        ]);
        if (!res) {
          set({ isLoading: false, errors: true });
        }
        if (!response) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, errors: false });
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    joinTables: async (body) => {
      set({ isLoading: true });
      try {
        const res = await joinTablesService(body);
        if (!res) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, errors: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    splitTables: async (id) => {
      set({ isLoading: true });
      try {
        const res = await splitTablesService(id);
        if (!res) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, errors: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    enableTable: async (id, body) => {
      set({ isLoading: true });
      try {
        const res = await enableTableService(id, body);
        if (!res) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, errors: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
  };
});
