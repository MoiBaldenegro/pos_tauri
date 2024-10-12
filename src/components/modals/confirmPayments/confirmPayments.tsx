import Loader from "../../loader/loader";
import styles from "./confirmPayment.module.css";
// icons
import revolveIcon from "./../../../assets/icon/revolveIcon.svg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth/auth.store";

interface Props {
  setIsLoading: (value: boolean) => void;
  revolve: string;
  isLoading: boolean;
  isOpen: any;
  onClose: any;
  children: any;
}
export default function ConfirmPayment({
  setIsLoading,
  revolve,
  isLoading,
  isOpen,
  onClose,
  children,
}: Props) {
  const navigate = useNavigate();

  //const authData = useAuthStore((state)=> state.authData);
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  setTimeout(() => {
    onClose();
    logOutRequest();
  }, 1200);
  return (
    <div className={styles.screen}>
      <section className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          {" "}
          X
        </button>
        {isLoading ? (
          <Loader />
        ) : !isLoading && revolve && revolve === "error" ? (
          <h1>Aca muestro lo del error </h1>
        ) : !isLoading && revolve !== "error" ? (
          <>
            <img src={revolveIcon} alt="revolve-icon" />
            <div>
              <h2 className={styles.revolveTittle}>Su cambio:</h2>
              <h2 className={styles.revolve}>
                ${parseFloat(children).toFixed(2)}
              </h2>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
