import { create } from "zustand";
import axios from "axios";

interface state {
  createNotes: (notesArray: any[]) => Promise<void>;
  isLoading: boolean;
  errors: boolean;
}
// ESTO YA NO SE USA // DEPRECATED // VERIFICAR SU ELIMINACION
export const useCheckStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    createNotes: async (notesArray) => {
      set({ isLoading: true });

      try {
        for (const note of notesArray) {
          try {
            const res = await axios.post(
              "https://tomate-server.onrender.com/notess",
              note
            );
            if (!res.data) {
              set({ isLoading: false, errors: true });
              return;
            }
          } catch (error) {
            console.error(error);
            set({ isLoading: false, errors: true });
            return;
          }
        }
        set({ isLoading: false, errors: false });
      } catch (error) {
        console.error(error);
        set({ isLoading: false, errors: true });
      }
    },
  };
});
