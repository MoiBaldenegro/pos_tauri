//api.js
import axios from "../configs/axios";
import { useState } from "react";
import { BILLS_PATH } from "../lib/routes.paths.lib";

export const useAccount = () => {
  const [loading, setLoading] = useState(false);
  const [newAccount, setNewAccount] = useState();

  const createAccount = async (account: any) => {
    try {
      setLoading(true);

      const response = await axios.post(BILLS_PATH, account);
      setLoading(false);
      if (!response.data) {
        throw new Error("No se encontro respuesta");
      }
      setNewAccount(response.data);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error(error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  };

  return { createAccount, loading, newAccount };
};
