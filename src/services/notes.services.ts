import axios from "../configs/axios";
import { NOTES_PATH } from "../lib/routes.paths.lib";

export const getNotesService = async () => {
  const response = await axios(NOTES_PATH);
  return response;
};
