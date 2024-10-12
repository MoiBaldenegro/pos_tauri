import { useEffect } from "react";
import { useOperationProcess } from "../../store/operatingPeriod/operatingPeriod.store";
import { useAuthStore } from "../../shared";

export default function UseVerify() {
  const authData = useAuthStore((state) => state.authData); // datos del usuario
  const currentPeriod = useOperationProcess((state) => state.operatingPeriod); // obtenemos el periodo actual
  const getPeriod = useOperationProcess((state) => state.getCurrentPeriod); // peticion del priodo acctual
  const isCashierEnable = authData.payload.user.cashierSession; // booleano para determinar si el usuario tiene una sesion de caja activa
  const cashierAvailable = currentPeriod[0]?.sellProcess.length > 0;

  useEffect(() => {
    getPeriod();
  }, []);

  return { isCashierEnable, currentPeriod, authData, cashierAvailable };
}
