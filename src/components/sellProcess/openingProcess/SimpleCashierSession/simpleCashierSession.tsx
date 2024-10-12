import styles from "./simpleCashierSession.module.css";
import tillIcon from "../../../../assets/icon/tillIcon.svg";
import useDate from "../../../../hooks/useDate";
import crossButton from "../../../../assets/icon/crossButton.svg";
import backSpace from "../../../../assets/icon/backspaceIcon.svg";
import minCheck from "../../../../assets/icon/minCheck.svg";
import onlyTill from "../../../../assets/icon/onlyTill.svg";
import { useState } from "react";
import { useCashierSessionStore } from "../../../../store/operatingPeriod/cashierSession.store";
import { CONFIRM_CHANGES } from "../../../../lib/modals.lib";
import { useAuthStore, useModal } from "../../../../shared";
import ConfirmChanges from "../../../modals/confirm/confirmChanges";
import {
  CASHIER_PATH,
  SELL_TYPES_PATH,
} from "../../../../lib/routes.paths.lib";
import { useOperationProcess } from "../../../../store/operatingPeriod/operatingPeriod.store";

interface Props {
  onClose: () => void;
}
export default function SimpleCashierSession({ onClose }: Props) {
  const { currentDateTime, opcionesFecha, opcionesHora }: any = useDate();
  const formattedFecha = currentDateTime.toLocaleDateString(
    "es-ES",
    opcionesFecha
  );
  const authData = useAuthStore((state) => state.authData);
  const cashierId = authData.payload.user._id;
  const getOperatingPeriod = useOperationProcess(
    (state) => state.getCurrentPeriod
  );
  const [value, setValue] = useState("");
  /*  const formattedHora = currentDateTime.toLocaleTimeString(
    "es-ES",
    opcionesHora
  );

  }*/
  const createSession = useCashierSessionStore((state) => state.createSession);
  const isLoading = useCashierSessionStore((state) => state.isLoading);
  const errors = useCashierSessionStore((state) => state.errors);
  const confirmChanges = useModal(CONFIRM_CHANGES);

  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "00"];

  return (
    <div className={styles.container}>
      <div>
        <div>
          <img src={tillIcon} alt="till-icon" />
          <h3>Apertura de caja</h3>
        </div>
        <div>
          <h3>{formattedFecha}</h3>
          <button onClick={onClose}>
            <img src={crossButton} alt="close-button" />
          </button>
        </div>
      </div>
      <div>
        <div>
          <h3>Ingresa el importe</h3>
          <strong>{value.length === 0 ? "$0" : `$${value}`}</strong>
        </div>
        <div>
          <div className={styles.mapKeys}>
            {keys.map((element, index) => (
              <button
                onClick={() => {
                  if (value.length >= 6) {
                    return;
                  }
                  setValue((prevValue) => {
                    return prevValue.concat(element);
                  });
                }}
                className={styles.key}
                key={index}
              >
                {element}
              </button>
            ))}
          </div>
          <div className={styles.rightButtons}>
            <button
              onClick={() => {
                setValue("");
              }}
            >
              <img src={backSpace} alt="backspace" />
            </button>
            <button>
              <img src={minCheck} alt="check" />
            </button>
          </div>
        </div>
        <button
          disabled={!value.length || parseFloat(value) < 100}
          onClick={() => {
            createSession(value, cashierId);
            confirmChanges.openModal();
          }}
        >
          <img src={onlyTill} alt="till-icon" />
          Abrir caja
        </button>
        {confirmChanges.isOpen &&
        confirmChanges.modalName === CONFIRM_CHANGES ? (
          <>
            <ConfirmChanges
              actionType={getOperatingPeriod}
              closeModal={onClose}
              isOpen={confirmChanges.isOpen}
              onClose={confirmChanges.closeModal}
              loading={isLoading}
              errors={errors}
            >{` Caja abierta con exito: $${value}`}</ConfirmChanges>
          </>
        ) : null}
      </div>
    </div>
  );
}
