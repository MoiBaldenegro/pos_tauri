import { create } from "zustand";
import { getNotesService } from "../services/notes.services";
import {
  updateNoteService,
  updatePropInNote,
} from "../services/orders/billWithNote.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  notesArray: [];
  getNotes: () => Promise<{}>;
  updateNote: (id: string, body: {}) => Promise<void>;
  updateNoteProp: (id: string, body: {}) => Promise<void>;
}

export const useNotesStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    notesArray: [],
    getNotes: async () => {
      set({ isLoading: true });
      try {
        const res = await getNotesService();
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudieron traer las notas",
          });
          throw new Error("No se pudieron traer las notas");
        }
        set({ isLoading: true });
        return res;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: "Ha ocurrido un error inesperado",
        });
      }
      throw new Error("Ha ocurrido un error inesperado");
    },
    updateNote: async (id, body) => {
      set({ isLoading: true });
      try {
        const res = await updateNoteService(id, body);
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudo actualizar la nota",
          });
          throw new Error("Error al actualizar la nota");
        }
        set({ isLoading: false });
        return;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: "No se pudo actualizar",
        });
        throw new Error("No se actualizo la nota debido a un error inesperado");
      }
    },
    updateNoteProp: async (id, body) => {
      set({ isLoading: true });
      try {
        const res = await updatePropInNote(id, body);
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudo actualizar la nota",
          });
          throw new Error("Error al actualizar la nota");
        }
        set({ isLoading: false });
        return;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: "No se pudo actualizar",
        });
        throw new Error("No se actualizo la nota debido a un error inesperado");
      }
    },
  };
});
