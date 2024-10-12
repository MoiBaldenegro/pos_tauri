import styles from "./exceptionMessages.module.css";
import exceptionIcon from "../../../assets/icon/exceptionIcon.svg";
import crossIcon from "../../../assets/icon/crossButton.svg";
import { useAuthStore } from "../../../shared";
import { ADMIN, CASHIER } from "../../tools/confirmPassword/lib";
import { useEffect } from "react";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  interactive?: boolean;
}
export default function ExceptionMessages({
  isOpen,
  onClose,
  children,
  interactive,
}: Props) {
  const authData = useAuthStore((state) => state.authData);
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const roleValue = authData?.payload?.user?.role?.role?.value;
  const isCashier = roleValue === CASHIER ? true : false;
  if (!interactive) {
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <main className={styles.screen}>
      <div>
        {interactive && (
          <button className={styles.closeButton} onClick={onClose}>
            <img src={crossIcon} alt="cross-button" />
          </button>
        )}
        <img src={exceptionIcon} alt="exception-icon" />
        <h2>{children}</h2>
        {interactive && (
          <div className={styles.interactiveButtons}>
            {isCashier && <button>Abrir Ahora</button>}
            <button
              onClick={() => {
                logOutRequest();
              }}
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
