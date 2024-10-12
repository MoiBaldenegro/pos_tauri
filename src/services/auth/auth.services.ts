import axios from "../../configs/axios";
import { SIGN_IN_PATH } from "../../lib/routes.paths.lib";

interface User {
  employeeNumber: string;
  pinPos: number;
}

export const signIn = async (user: User) => {
  const response = await axios.post(SIGN_IN_PATH, user);
  return response;
};
