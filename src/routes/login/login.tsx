// Styles
import styles from "./login.module.css";
import "../../styles/global/global.css";
// Hooks
// Icons
import posLogo from "../../assets/icon/tomatePOSlogo.svg";
import fingerprintIco from "../../assets/icon/fingerprint.svg";
import startShift from "../../assets/icon/startShift.svg";
import dividerBtn from "../../assets/icon/dividerBtn.svg";
import foodShift from "../../assets/icon/foodShift.svg";
import bullet from "../../assets/icon/bullet.svg";
// Components
import Pinboard from "../../components/tools/pinBoard/Pinboard";
import HeaderOne from "../../components/headers/headerOne/headerOne";
// Dependencies
import { useEffect, useState } from "react";
import ConfirmPassword from "../../components/tools/confirmPassword/confirmPassword";
import { CONFIRM_PASSWORD } from "../../components/tools/confirmPassword/lib";
import { useModal } from "../../hooks/useModal";
import { REGISTER_SHIFT } from "../../lib/login.lib";
import ShiftRegister from "../../components/shiftRegister/shiftRegister";
import {
  CONFIRM_ENTRY_DAILY,
  CONFIRM_REGISTER_SHIFT_MODAL,
  EXCEPTION_MESSAGES_MODAL,
} from "../../lib/modals.lib";
import ConfirmEntryDaily from "../../components/confirmDailyEntry/confirmDailyEntry";
import ConfirmShift from "../../components/modals/confirmShift/confirmShift";
import { useEntryDaily } from "../../store/dailyRegisterStore";
import ExceptionMessages from "../../components/modals/exceptionMessages/exceptionMessages";
import UseFingerCapture from "@/hooks/useFingerCapture";
import UseFingerSignIn from "@/hooks/useFingerSignIn";

export default function Login() {
  // Modals
  const confirmPassword = useModal(CONFIRM_PASSWORD);
  const registerShift = useModal(REGISTER_SHIFT);
  const confirmEntry = useModal(CONFIRM_ENTRY_DAILY);
  const confirmRegisterDailyShift = useModal(CONFIRM_REGISTER_SHIFT_MODAL);
  const exceptionMessage = useModal(EXCEPTION_MESSAGES_MODAL);

  // states
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeeNumberShift, setEmployeeNumberShift] = useState("");
  const [password, setPassword] = useState("");
  const [regShift, setRegShift] = useState<boolean>(false);

  // Entry daily register
  const isLoadingShift = useEntryDaily((state) => state.isLoading);
  const isErrorsShift = useEntryDaily((state) => state.errors);
  const createRegister = useEntryDaily((state) => state.createEntryDaily);
  const messages = useEntryDaily((state) => state.message);

  const { initReader } = UseFingerSignIn(confirmEntry.openModal);

  useEffect(() => {
    initReader();
  }, []);

  return (
    <div className={styles.container}>
      <HeaderOne />
      <main className={styles.mainSection}>
        <section className={styles.sectionOne}>
          <img src={posLogo} alt="pos-logo" />
        </section>
        <section className={styles.sectionTwo}>
          <h4>ingresar código</h4>
          <div className={styles.nums}>
            {employeeNumber.length > 0 &&
            employeeNumber.length < 2 &&
            employeeNumber.length === 1 ? (
              <div className={styles.sign}>
                <span>{employeeNumber.slice(0, 1)}</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            ) : employeeNumber.length > 1 &&
              employeeNumber.length < 3 &&
              employeeNumber.length === 2 ? (
              <div className={styles.sign}>
                <span>{employeeNumber.slice(0, 1)}</span>
                <span>{employeeNumber.slice(1, 2)}</span>
                <span>.</span>
                <span>.</span>
              </div>
            ) : employeeNumber.length > 2 &&
              employeeNumber.length < 4 &&
              employeeNumber.length === 3 ? (
              <div className={styles.sign}>
                <span>{employeeNumber.slice(0, 1)}</span>
                <span>{employeeNumber.slice(1, 2)}</span>
                <span>{employeeNumber.slice(2, 3)}</span>
                <span>.</span>
              </div>
            ) : employeeNumber.length > 3 &&
              employeeNumber.length < 5 &&
              employeeNumber.length === 4 ? (
              <div className={styles.sign}>
                <span>{employeeNumber.slice(0, 1)}</span>
                <span>{employeeNumber.slice(1, 2)}</span>
                <span>{employeeNumber.slice(2, 3)}</span>
                <span>{employeeNumber.slice(3, 4)}</span>
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
          <Pinboard
            action={confirmPassword.openModal}
            set={setEmployeeNumber}
            value={employeeNumber}
          />
        </section>
      </main>
      <footer className={styles.footer}>
        <div>
          <button>
            <img src={fingerprintIco} alt="fingerprint-icon" />
          </button>
          <img src={dividerBtn} alt="divider-icon" />
          <button
            onClick={() => {
              registerShift.openModal();
              setRegShift(true);
            }}
            style={regShift ? { background: "rgba(94, 135, 8, 1)" } : {}}
          >
            <img src={startShift} alt="start-shift-icon" />
          </button>
          <button>
            <img src={foodShift} alt="food-shift" />
          </button>
        </div>
        <div>
          <h3>POS</h3>
          <img src={bullet} alt="bullet-icon" />
          <h3>LOC Terraza</h3>
          <img src={bullet} alt="bullet-icon" />
          <h3>v-Develop</h3>
        </div>
      </footer>
      {confirmPassword.isOpen &&
      confirmPassword.modalName === CONFIRM_PASSWORD ? (
        <ConfirmPassword
          dailyRegisterException={exceptionMessage.openModal}
          pin={employeeNumber}
          reset={setEmployeeNumber}
          set={setPassword}
          value={password}
          isOpen={confirmPassword.isOpen}
          onClose={confirmPassword.closeModal}
        >
          ""
        </ConfirmPassword>
      ) : null}
      {registerShift.isOpen && registerShift.modalName === REGISTER_SHIFT ? (
        <ShiftRegister
          openModal={confirmEntry.openModal}
          isOpen={registerShift.isOpen}
          onClose={registerShift.closeModal}
          setStyle={setRegShift}
          settingEmployeeNumber={setEmployeeNumberShift}
          employeeNumber={employeeNumberShift}
        >
          Registro de turno
        </ShiftRegister>
      ) : null}
      {confirmEntry.isOpen && confirmEntry.modalName === CONFIRM_ENTRY_DAILY ? (
        <ConfirmEntryDaily
          createRegister={createRegister}
          openModal={confirmRegisterDailyShift.openModal}
          isOpen={confirmEntry.isOpen}
          onClose={confirmEntry.closeModal}
          setStyle={setRegShift}
          settingEmployeeNumber={setEmployeeNumberShift}
          employeeNumber={employeeNumberShift}
        >
          Contraseña
        </ConfirmEntryDaily>
      ) : null}
      {confirmRegisterDailyShift.isOpen &&
      confirmRegisterDailyShift.modalName === CONFIRM_REGISTER_SHIFT_MODAL ? (
        <ConfirmShift
          loading={isLoadingShift}
          errors={isErrorsShift}
          isOpen={confirmRegisterDailyShift.isOpen}
          onClose={confirmRegisterDailyShift.closeModal}
        >
          {messages}
        </ConfirmShift>
      ) : null}
      {exceptionMessage.isOpen &&
      exceptionMessage.modalName === EXCEPTION_MESSAGES_MODAL ? (
        <ExceptionMessages
          isOpen={exceptionMessage.isOpen}
          onClose={exceptionMessage.closeModal}
        >
          Es necesario registrar entrada
        </ExceptionMessages>
      ) : null}
    </div>
  );
}
