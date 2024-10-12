import axios from "../configs/axios";
import { TABLE_IN_USER_PATH, USERS_PATH } from "../lib/routes.paths.lib";

export const injectPropInUser = async (args: any, id: string) => {
  const response = await axios.put(`${USERS_PATH}/${id}`, args);
  return response;
};

export const resetTablesInUsersService = async () => {
  const response = axios.put(TABLE_IN_USER_PATH);
  return response;
};

export const getusersService = async () => {
  const response = await axios.get(USERS_PATH);
  return response;
};
