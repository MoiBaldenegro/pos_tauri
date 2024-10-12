import axios from "../configs/axios";
import { BILLS_PATH, NOTES_PATH } from "../lib/routes.paths.lib";

type NoteName = {
  noteName: string;
};

type BillName = {
  billName: string;
};

type Comments = {
  comments: string;
};

export const addName = async (id: string, billName: BillName) => {
  const res = await axios.put(`${BILLS_PATH}/${id}`, billName);
  return res;
};

export const addComments = async (id: string, comments: Comments) => {
  const res = await axios.put(`${BILLS_PATH}/${id}`, comments);
  return res;
};

export const createNotes = async (notesArray: any) => {
  const updatedNotes = notesArray.map((note: any) => {
    const total = note.products
      .reduce((acc: number, product: any) => {
        return acc + parseFloat(product.priceInSite);
      }, 0)
      .toString();
    return { ...note, checkTotal: total };
  });
  console.log(updatedNotes);
  const noteIds = [];
  try {
    for (const note of updatedNotes) {
      if (!note._id) {
        console.log("Creacion");
        console.log(note);
        try {
          const res = await axios.post(NOTES_PATH, note);

          if (res.data && res.data._id) {
            noteIds.push(res.data._id);
          } else {
            console.error("Error: No se recibió un ID para la nota.");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const transferNote = {
            accountId: null,
            body: { products: note.products },
          };
          console.log("Aca el objeto que anda observanmdo");
          console.log(transferNote);
          const res = await axios.put(
            `${NOTES_PATH}/${note._id}`,
            transferNote
          );
          noteIds.push(note._id);
        } catch (error) {
          console.error(error);
        }
      }
    }
    return noteIds;
  } catch (error) {
    console.error(error);
  }
};

export const injectNotesInBill = async (id: string, notesArray: any[]) => {
  const response = axios.put(`${BILLS_PATH}/${id}`, {
    notes: notesArray,
  });
  return response;
};

export const addNameInNote = async (id: string, noteName: NoteName) => {
  const data = {
    accountId: null,
    body: noteName,
  };
  const response = axios.put(`${NOTES_PATH}/${id}`, data);
  return response;
};

export const getBillServices = async () => {
  const response = axios(BILLS_PATH);
  return response;
};
