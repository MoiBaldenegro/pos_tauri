import axios from "../configs/axios";
import { TABLES_PATH, TABLES_RESET_PATH } from "../lib/routes.paths.lib";

export const getTablesService = async () => {
  const response = axios(TABLES_PATH);
  return response;
};

export interface UpdateTable {
  _id: any;
  tableNum?: string;
  server?: string;
  status?: string;
  bill?: any[];
  assigned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const updateTablesService = async (
  tablesArgs: UpdateTable[],
  userId: string
) => {
  try {
    const responses = [];
    for (const updateTable of tablesArgs) {
      const res = await axios.patch(`${TABLES_PATH}/${updateTable._id}`, {
        assigned: true,
        user: userId,
      });
      responses.push(res);
    }
    return responses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetTablesService = async () => {
  const response = await axios.put(TABLES_RESET_PATH);
  return response;
};

export const joinTablesService = async (body: any) => {
  const res = await axios.put(`${TABLES_PATH}/join`, body);
  return res;
};

export const splitTablesService = async (id: string) => {
  const res = await axios.put(`${TABLES_PATH}/split/${id}`);
  return res;
};

export const enableTableService = async (id: string, body: any) => {
  const res = await axios.patch(`${TABLES_PATH}/enable/${id}`, body);
  return res;
};
