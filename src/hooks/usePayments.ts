import axios from "../configs/axios";
import { Payment } from "../types/payment";
import { useState } from "react";
import { PAYMENTS_PATH } from "../lib/routes.paths.lib";

export default function UsePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const [payment, setPayment] = useState<Payment>();

  const createPayment = async (payment: Payment) => {
    console.log(payment);
    setIsLoading(true);
    try {
      const res = await axios.post(PAYMENTS_PATH, payment);

      const newPayment = await res.data;
      if (!newPayment) {
        setIsLoading(false);
        setErrors("No se pudo completar el pago");
        return;
      }
      setIsLoading(false);
      setPayment(newPayment);
      return newPayment;
    } catch (error) {
      setIsLoading(false);
      setErrors("No se pudo completar el pago debido a un error inesperado");
    }
  };
  return {
    isLoading,
    errors,
    payment,
    createPayment,
  };
}
