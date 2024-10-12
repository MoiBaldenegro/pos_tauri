// Styles
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import "../../styles/global/global.css";
import styles from "./cashier.module.css";

// Icons
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
import logOutIcon from "../../assets/icon/logOutIcon.svg";
import homeIcon from "../../assets/icon/homeIcon.svg";
import pauseBtn from "../../assets/icon/pauseBtn.svg";
import playBtn from "../../assets/icon/playBtn.svg";

// Hooks
import { useModal } from "../../hooks/useModal";
import UseAccount from "../../hooks/useAccount";

// Types and interfaces
import PaymentInterface from "../../components/payments/payments.int";

// Components
import CashierBox from "../../components/cashierBox/cashierBox";
import { useEffect, useState } from "react";
import ConfirmPayment from "../../components/modals/confirmPayments/confirmPayments";
import { useAuthStore } from "../../store/auth/auth.store";
import { useNavigate } from "react-router-dom";
import {
  CONFIRM_PAYMENT_MODAL,
  EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL,
  PAYMENT_INTERFACE_MODAL,
} from "../../lib/modals.lib";
import ExceptionMessages from "../../components/modals/exceptionMessages/exceptionMessages";
import UseCashierException from "../../hooks/exceptions/useCashierException";
import { useNotesStore } from "../../store/notes.store";
import { FOR_PAYMENT_STATUS } from "../../lib/tables.status.lib";
import { ENTRY_PATH } from "../../lib/routes.paths.lib";
import { useOperationProcess } from "../../store/operatingPeriod/operatingPeriod.store";
import { useCashierSession } from "@/store/cashierSession.store";
import ConfirmChanges from "@/components/modals/confirm/confirmChanges";

export default function Cashier() {
  //exceptions
  const cashierSessionException = useModal(
    EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL
  );

  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const navigate = useNavigate();

  const paymentInterface = useModal(PAYMENT_INTERFACE_MODAL);
  const confirmPayment = useModal(CONFIRM_PAYMENT_MODAL);
  const confirmChanges = useModal("confirmChanges");
  const { accountArray, getBills } = UseAccount();
  const [currentBill, setCurrentBill] = useState<{}>();

  /////////////////////////////
  // Manejo de errores en el pago
  const [errors, setErros] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [revolve, setRevolve] = useState<string>("");
  const authData = useAuthStore((state) => state.authData);
  const pauseResumeSession = useCashierSession(
    (state) => state.pauseResumeSession
  );

  const notesArray = useNotesStore((state) => state.notesArray);
  const getNotes = useNotesStore((state) => state.getNotes);
  //////////////////////////
  UseCashierException(cashierSessionException.openModal);
  const operatingPeriod = useOperationProcess((state) => state.operatingPeriod);
  const getPeriod = useOperationProcess((state) => state.getCurrentPeriod);
  const filterSession = operatingPeriod[0]?.sellProcess?.filter(
    (item: any) => item.user === authData.payload.user._id
  );

  const loadingCashierSession = useCashierSession((state) => state.isLoading);
  const errorsCashierSession = useCashierSession((state) => state.errors);

  const refreshFunction = () => {
    getPeriod();
    getNotes();
    getBills();
  };

  useEffect(() => {
    getPeriod();
    getNotes();
    getBills();
  }, []);

  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        {filterSession && filterSession.length > 0
          ? filterSession[0].bills?.map((item) =>
              item.status === FOR_PAYMENT_STATUS && !item.notes.length ? (
                <div key={item.id}>
                  <CashierBox
                    setting={setCurrentBill}
                    openModal={paymentInterface.openModal}
                    item={item}
                    route={ENTRY_PATH}
                  />
                </div>
              ) : (
                item.notes.map(
                  (note, index) =>
                    note.status === FOR_PAYMENT_STATUS && (
                      <div key={note.id}>
                        <CashierBox
                          setting={setCurrentBill}
                          openModal={paymentInterface.openModal}
                          item={item}
                          isNote={note}
                          route={ENTRY_PATH}
                        />
                      </div>
                    )
                )
              )
            )
          : null}
        {confirmChanges.isOpen &&
        confirmChanges.modalName === "confirmChanges" ? (
          <ConfirmChanges
            errors={errorsCashierSession}
            loading={loadingCashierSession}
            isOpen={confirmChanges.isOpen}
            onClose={confirmChanges.closeModal}
            actionType={refreshFunction}
          >
            Cambios guardados
          </ConfirmChanges>
        ) : null}
        {paymentInterface.isOpen &&
        paymentInterface.modalName === PAYMENT_INTERFACE_MODAL ? (
          <PaymentInterface
            setRevolve={setRevolve}
            handleLoading={setIsloading}
            currentBill={currentBill}
            openModal={confirmPayment.openModal}
            isOpen={paymentInterface.isOpen}
            onClose={paymentInterface.closeModal}
          >
            Cobrar
          </PaymentInterface>
        ) : null}
        {confirmPayment.isOpen &&
        confirmPayment.modalName === CONFIRM_PAYMENT_MODAL ? (
          <ConfirmPayment
            setIsLoading={setIsloading}
            revolve={revolve}
            isLoading={isLoading}
            isOpen={confirmPayment.isOpen}
            onClose={confirmPayment.closeModal}
          >
            {revolve}
          </ConfirmPayment>
        ) : null}
        {cashierSessionException.isOpen &&
        cashierSessionException.modalName ===
          EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL ? (
          <ExceptionMessages
            interactive={true}
            isOpen={cashierSessionException.isOpen}
            onClose={cashierSessionException.closeModal}
          >
            No hay cajas abiertas
          </ExceptionMessages>
        ) : null}
      </main>
      <footer className={styles.footer}>
        <div>
          <button
            onClick={() => {
              logOutRequest();
            }}
          >
            <img src={logOutIcon} alt="back-icon" />
            Salir
          </button>
          <button
            onClick={() => {
              navigate("/sell-types");
            }}
          >
            <img src={homeIcon} alt="home-icon" />
            Inicio
          </button>
        </div>
        {filterSession &&
        filterSession.length > 0 &&
        filterSession[0]?.enable ? (
          <button
            disabled={!filterSession[0]}
            onClick={() => {
              confirmChanges.openModal();
              pauseResumeSession(filterSession[0]?._id);
            }}
          >
            <img src={pauseBtn} alt="pause-icon" />
            Pausar caja
          </button>
        ) : (
          <button
            disabled={!filterSession || !filterSession[0]}
            onClick={() => {
              confirmChanges.openModal();
              pauseResumeSession(filterSession[0]?._id);
            }}
          >
            <img src={playBtn} alt="play-button" />
            Reanudar caja
          </button>
        )}
        <div>
          <span>
            <img src={enableIcon} alt="enable-icon" />
            Activa
          </span>
          <span>
            <img src={paymentIcon} alt="payment-icon" />
            Por pagar
          </span>
        </div>
      </footer>
    </div>
  );
}
