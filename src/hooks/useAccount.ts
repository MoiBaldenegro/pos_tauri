import axios from "axios";
import axiosInstance from "../configs/axios";
import { Bill } from "../types/account";
import { useState } from "react";
import {
  BILLS_PATH,
  DEVICE_IDN_PATH,
  TABLES_PATH,
} from "../lib/routes.paths.lib";

export default function UseAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [accountArray, setAccountArray] = useState<Bill[]>();
  const [newAccount, setNewAccount] = useState([]);
  const [errors, setErrors] = useState(false);
  const [currentBill, setCurrentBill] = useState();

  const getLocalDevice = async () => {
    setIsLoading(true);
    try {
      const serial = await axios("http://localhost:8000/device/idn");
      if (!serial) {
        setIsLoading(false);
        setErrors(true);
      }
      return serial;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
    }
  };

  async function createAccount(account: Bill) {
    setIsLoading(true);
    const accountProducts = account.products.map((item) => {
      const newProductStatus = { ...item, active: true };
      return newProductStatus;
    });

    const sendAccount = { ...account, products: accountProducts };
    try {
      const response = await axiosInstance.post(BILLS_PATH, sendAccount);
      setIsLoading(false);
      if (!response.data) {
        throw new Error("No se encontro respuesta");
      }
      setNewAccount(response.data);
      alert("Enviado con exito"); // aca hay que abrir el modal de confirmacion y bquitar elo alert
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }
  async function getBills() {
    setIsLoading(true);
    try {
      const res = await axiosInstance(BILLS_PATH);
      if (!res.data) {
        setIsLoading(false);
        throw new Error("No se encontraron cuentas");
      }
      setIsLoading(false);
      const accounts = res.data;
      setAccountArray(accounts);
      return accounts;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  async function getAccount(id: string) {
    setIsLoading(true);
    try {
      const res = await axiosInstance(`${BILLS_PATH}/${id}`);
      if (!res.data) {
        setIsLoading(false);
        throw new Error("No se encontraron cuentas");
      }
      setIsLoading(false);
      const accounts = res.data;
      setCurrentBill(accounts);
      return accounts;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  async function updateBill(
    statusChange: string,
    currentBill: any,
    form?: Bill
  ) {
    /*   tables.map((item) => {
      if (item.tableNum === tableId) {
      }
    });  */
    const id = currentBill._id;
    //const currentProducts = form?.products ?? currentBill.products;

    const accountProducts = form?.products.map((item) => {
      const newProductStatus = { ...item, active: true };
      return newProductStatus;
    });

    const sendAccount = { ...form, products: accountProducts };
    try {
      const res = await axiosInstance.put(`${BILLS_PATH}/${id}`, {
        status: statusChange,
        products: sendAccount.products,
        checkTotal: sendAccount.checkTotal,
      });
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de las mesas");
      }
      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
  async function addBill(statusChange: string, id: string) {
    /*   tables.map((item) => {
      if (item.tableNum === tableId) {
      }
    });  */
    try {
      const res = await axiosInstance.patch(`${TABLES_PATH}/${id}`, {
        bill: [statusChange],
      });
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de las mesas");
      }
      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }

  const handlePrint = async (process: string, billPrint: Bill | undefined) => {
    // const printers = ["192.168.1.88", "192.168.1.82"]; // estas las tomariamos de la cuenta por que vienen dentro ya.
    // Pero debemos saber cual es el proceso de impresion que se esta llevando a cabo primero
    //
    const serial = await getLocalDevice(); // EL SERIAL LLEGA ACA CORRECTAMENTE

    if (!serial) {
      setIsLoading(false);
      setErrors(true);
      return;
    }
    try {
      const response = axiosInstance(`${DEVICE_IDN_PATH}/${serial.data}`);
      if (!response) {
        setIsLoading(false);
        setErrors(true);
      }
      const settingsArray = (await response).data.settings;

      const printersObjectArray: any = settingsArray.find(
        (item: any) => item.printer
      );
      const printers = printersObjectArray.printers.map(
        (item: any) => item.tcp
      );

      printers?.forEach(async (item: any) => {
        const data = {
          data: billPrint,
          tcp: item,
        };
        try {
          await axios.post(`http://localhost:8000/print/${process}`, data);
          console.log("Ticket enviado para impresión");
        } catch (error) {
          console.error("Error al enviar el ticket para impresión", error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const changeKey = async (id: string, key: any) => {
    setIsLoading(true);
    console.log(id, key);
    try {
      const res = await axiosInstance.put(`${BILLS_PATH}/${id}`, key);
      if (!res) {
        setErrors(true);
      }
      setIsLoading(false);
      setErrors(false);
      return res.data;
    } catch (error) {
      setErrors(true);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errors,
    createAccount,
    newAccount,
    getAccount,
    accountArray,
    handlePrint,
    updateBill,
    addBill,
    currentBill,
    getBills,
    changeKey,
  };
}
