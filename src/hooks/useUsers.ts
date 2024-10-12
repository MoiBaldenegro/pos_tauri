import axios from "../configs/axios";
import { useState } from "react";
import { USERS_PATH } from "../lib/routes.paths.lib";

export default function UseUsers() {
  const [usersArray, setUsersArray] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(USERS_PATH, {
        timeout: 5000,
      });

      if (res.status < 200 || res.status >= 300) {
        setIsLoading(false);
        setErrors(true);
        throw new Error(
          `Error en la petición: ${res.status} ${res.statusText}`
        );
      }
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        throw new Error(
          "No se pudo resolver la peticion, usuarios no encontrado"
        );
      }
      const usersData = res.data;
      setIsLoading(false);
      setUsersArray(usersData);
      return usersData;
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
        console.error("Tiempo de espera de la solicitud agotado");
        // Realizar acciones específicas, como mostrar un mensaje al usuario
      } else {
        console.error("Error inesperado:", error);
      }
      console.error(
        `No se pudo resolver la peticion debido a un error inesperado ${error}`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { usersArray, isLoading, errors, getUsers };
}
