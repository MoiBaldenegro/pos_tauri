import styles from "./confirmPassword.module.css";
import returnIcon from "../../../assets/icon/returnIcon.svg";
import checkIcon from "../../../assets/icon/buttonCheck.svg";
import { useEffect } from "react";
import { useAuthStore } from "../../../store/auth/auth.store";
import { useNavigate } from "react-router-dom";
import { ADMIN, CASHIER, HOSTESS, MANAGER, USER, WAITER } from "./lib";
import {
  CASHIER_PATH,
  HOST_PATH,
  RESTAURANT_PATH,
  SELL_TYPES_PATH,
} from "../../../lib/routes.paths.lib";
import { keys } from "../../../lib/components.lib";
import Loader from "../../loader/loader";
import { useOperationProcess } from "../../../store/operatingPeriod/operatingPeriod.store";

interface Props {
  pin: string;
  reset: (arg: string) => void;
  set: (arg: string) => void;
  value: string;
  isOpen: any;
  onClose: any;
  children: any;
  dailyRegisterException: () => void;
}
export default function ConfirmPassword({
  isOpen,
  onClose,
  children,
  value,
  set,
  reset,
  pin,
  dailyRegisterException,
}: Props) {
  const getOperatingPeriod = useOperationProcess(
    (state) => state.getCurrentPeriod
  );
  const isLoading = useAuthStore((state) => state.isLoading);
  const loginRequest = useAuthStore((state) => state.loginRequest);
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const authData = useAuthStore((state) => state.authData);
  const errors = useAuthStore((state) => state.message);
  const isAuth = useAuthStore((state) => state.isAuth);
  const navigate = useNavigate();
  const userAuth = { employeeNumber: pin, pinPos: parseFloat(value) };

  useEffect(() => {
    getOperatingPeriod();
    if (isAuth) {
      if (!authData.payload.user.dailyRegister) {
        dailyRegisterException();
        logOutRequest();
        return;
      }
      const userRole = authData.payload?.user?.role?.role?.value;
      if (userRole === ADMIN || userRole === USER || userRole === MANAGER) {
        navigate(SELL_TYPES_PATH);
      } else if (userRole === CASHIER) {
        navigate(CASHIER_PATH);
      } else if (userRole === WAITER) {
        navigate(RESTAURANT_PATH);
      } else if (userRole === HOSTESS) {
        navigate(HOST_PATH);
      }
    }
    return;
  }, [isAuth]);

  if (isLoading) {
    return (
      <div className={styles.screen}>
        <section>
          <Loader />
        </section>
      </div>
    );
  }

  return (
    <main className={styles.screen}>
      <div className={styles.container}>
        <button
          className={styles.closeButton}
          onClick={() => {
            onClose();
            set("");
            reset("");
          }}
        >
          X
        </button>
        <h3>Ingreso de contraseña</h3>
        <div className={styles.nums}>
          {value.length > 0 && value.length < 2 && value.length === 1 ? (
            <div className={styles.sign}>
              <span>{value.slice(0, 1)}</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          ) : value.length > 1 && value.length < 3 && value.length === 2 ? (
            <div className={styles.sign}>
              <span>{value.slice(0, 1)}</span>
              <span>{value.slice(1, 2)}</span>
              <span>.</span>
              <span>.</span>
            </div>
          ) : value.length > 2 && value.length < 4 && value.length === 3 ? (
            <div className={styles.sign}>
              <span>{value.slice(0, 1)}</span>
              <span>{value.slice(1, 2)}</span>
              <span>{value.slice(2, 3)}</span>
              <span>.</span>
            </div>
          ) : value.length > 3 && value.length < 5 && value.length === 4 ? (
            <div className={styles.sign}>
              <span>{value.slice(0, 1)}</span>
              <span>{value.slice(1, 2)}</span>
              <span>{value.slice(2, 3)}</span>
              <span>{value.slice(3, 4)}</span>
            </div>
          ) : (
            <div className={styles.sign}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          )}
        </div>
        {keys.map((element, index) => (
          <button
            key={index}
            onClick={() => {
              if (value?.length >= 4) {
                return;
              }
              const newValue = value?.concat(element);
              console.log(newValue);
              set(newValue);
            }}
          >
            {element}
          </button>
        ))}
        <button
          onClick={() => {
            set("");
          }}
        >
          <img src={returnIcon} alt="return-icon" />
        </button>
        <button
          onClick={() => {
            if (value?.length >= 4) {
              return;
            }
            const newValue = value?.concat("0");
            set(newValue);
          }}
        >
          0
        </button>
        <button
          disabled={value.length < 4}
          className={styles.check}
          onClick={async () => {
            await loginRequest(userAuth);
            set("");
            reset("");
            onClose();
          }}
        >
          <img src={checkIcon} alt="check-Icon" />
        </button>
      </div>
    </main>
  );
}
