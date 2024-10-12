import { create } from "zustand";
import { MoveTableDto } from "../../types/moreActions";
import {
  SaveBillInTableService,
  UpdatePropInBillService,
  createDiscountService,
  deleteBillProductDiscounService,
  deleteDiscountService,
  deleteNoteProductDiscounService,
  productsToBillServices,
} from "../../services/moreActions/moreActions";
import {
  addComments,
  addName,
  addNameInNote,
  createNotes,
  injectNotesInBill,
} from "../../services/bill.services";
import {
  cancelBillService,
  cancelProductService,
} from "../../services/cancellation.store";

export interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  moveBill: (data: MoveTableDto) => Promise<void>;
  updateName: (id: string, arg: string) => Promise<void>;
  updateNameInNote: (id: string, arg: string) => Promise<void>;
  updateComments: (id: string, arg: string) => Promise<void>;
  createNotes: (notesArray: any[], id: string) => Promise<void>;
  cancelBill: (body: {}) => Promise<void>;
  transferProducts: (data: any) => Promise<void>;
  createDiscount: (data: {}) => Promise<void>;
  cancelProduct: (args: {}) => Promise<void>;
  deleteDiscount: (id: string, body: { case: string }) => Promise<void>;
  deleteNoteProductDiscount: (id: string, body: {}) => Promise<void>;
  deleteBillProductDiscount: (id: string, body: {}) => Promise<void>;
}

export const UseActions = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    moveBill: async (data) => {
      set({ isLoading: true });
      try {
        const [firstRequestRes, secondRequestRes] = await Promise.all([
          SaveBillInTableService(data.receivingTableId, data.receivingTable),
          SaveBillInTableService(data.idHost, data.dataHost),
        ]);
        if (!secondRequestRes.data) {
          try {
            const res = await SaveBillInTableService(
              data.idHost,
              data.receivingTable
            );
            set({
              isLoading: false,
              errors: true,
              message: "Se revirtieron los cambios",
            });

            throw new Error(
              "No se pudo realizar el cambio de mesa, se han revertido los cambios"
            );
          } catch (error) {
            set({ isLoading: false, errors: true });
            throw new Error("No se pudo realizar el cambio de mesa");
          }
        }
        if (firstRequestRes && secondRequestRes) {
          const res = await UpdatePropInBillService(data.item.bill[0]._id, {
            transferHistory: [data.item.tableNum],
            tableNum: data.receivingItem.tableNum,
            table: data.receivingItem._id,
          });
          if (!res.data) {
            set({ message: "No se actualizo el historial de transferencia" });
          }
        }
        const resData = { firstRequestRes, secondRequestRes };
        set({ isLoading: false });
        return resData;
      } catch (error) {
        set({ isLoading: false, errors: true });

        throw new Error(
          `Ha ocurrido algo inesperado. Mas informacion: ${error}`
        );
      }
    },
    updateName: async (id, arg) => {
      set({ isLoading: true });
      const data = { billName: arg };
      try {
        const response = await addName(id, data);
        if (!response.data) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    updateNameInNote: async (id, arg) => {
      set({ isLoading: true });
      try {
        const data = {
          noteName: arg,
        };
        const res = await addNameInNote(id, data);
        if (!res.data) {
          set({ isLoading: false, errors: true });
          throw new Error("No se ha podido guardar");
        }
        set({ isLoading: false });
      } catch (error) {
        set({ isLoading: false, errors: true });
        throw new Error("Ha ocurrido algo inesperado");
      }
    },
    updateComments: async (id, arg) => {
      set({ isLoading: true });
      const data = { comments: arg };
      try {
        const response = await addComments(id, data);
        if (!response) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    createNotes: async (notesArray, id) => {
      set({ isLoading: true });
      try {
        const noteIds = await createNotes(notesArray);

        if (!noteIds || noteIds.length === 0) {
          set({ isLoading: false, errors: true });
          return;
        }

        if (noteIds.length >= 2) {
          try {
            const res = await injectNotesInBill(id, noteIds);
            if (!res.data) {
              throw new Error("No se pudieron guardar las notas");
            }
          } catch (error) {
            console.error(error);
            throw new Error("Ha ocurrido algo inesperado");
          }
        }
        set({ isLoading: false });
      } catch (error) {
        console.error(error);
        set({ isLoading: false, errors: true });
      }
    },
    cancelBill: async (body) => {
      console.log(body);
      set({ isLoading: true });
      try {
        const res = await cancelBillService(body);
        if (!res.data) {
          set({ isLoading: false, errors: true });
          throw new Error("No se pudo cancelar");
        }
        set({ isLoading: false });
        return;
      } catch (error) {
        set({ isLoading: false, errors: true });
        throw new Error(`No se pudo actualizar. ${error}`);
      }
    },
    transferProducts: async (data) => {
      set({ isLoading: true });
      try {
        const res = await productsToBillServices(data);
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: `No se actualizo debido a un error inesperado, mas informacion: ${error}`,
        });
        throw new Error(
          `No se actualizo debido a un error inesperado, mas informacion: ${error}`
        );
      }
    },
    createDiscount: async (data) => {
      set({ isLoading: true });
      try {
        const res = await createDiscountService(data);
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    cancelProduct: async (args) => {
      set({ isLoading: true });
      try {
        const res = await cancelProductService(args);
        set({ isLoading: false, errors: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    deleteDiscount: async (id: string, body: any) => {
      set({ isLoading: true });
      try {
        const res = await deleteDiscountService(id, body);
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    deleteNoteProductDiscount: async (id: string, body: any) => {
      set({ isLoading: true });
      try {
        const res = await deleteNoteProductDiscounService(id, body);
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    deleteBillProductDiscount: async (id: string, body: any) => {
      set({ isLoading: true });
      try {
        const res = await deleteBillProductDiscounService(id, body);
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
  };
});
