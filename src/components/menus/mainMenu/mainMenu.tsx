import styles from "./mainMenu.module.css";
import closeIcon from "../../../assets/icon/closeButton.svg";
import burgerMenu from "../../../assets/icon/burgerColorIcon.svg";
import menuTwo from "../../../assets/icon/menuIconTwo.svg";
import menuThree from "../../../assets/icon/menuIconThree.svg";
import menuFour from "../../../assets/icon/menuIconFour.svg";
import menuFive from "../../../assets/icon/menuIconFive.svg";
import menuSix from "../../../assets/icon/menuIconSix.svg";
import menuEight from "../../../assets/icon/menuIconEight.svg";
import menuNine from "../../../assets/icon/menuIconNine.svg";
import cashOutIcon from "../../../assets/icon/cashOut.svg";
import tipsIcon from "../../../assets/icon/tipsIcon.svg";
import opertingIcon from "../../../assets/icon/operatingIcon.svg";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../hooks/useModal";
import { CASH_MOVES } from "../mainMenuActions/constants";
import CashMoves from "../mainMenuActions/cashMoves/cashMoves";
import posWallSprite from "@/assets/icon/posWallSprite.svg";
import { TABLES_CONTROL_PATH } from "../../../lib/routes.paths.lib";
import {
  CASH_OUT_PROCESS,
  CLOSE_CASHIER_SESSION,
  CLOSE_OPERATIONS_PERIOD,
  CONFIRM_CHANGES,
  DISABLED_PRODUCTS,
  OPEN_CASHIER_SESSION,
} from "../../../lib/modals.lib";
import DisableProducts from "../../disableProducts/disableProducts";
import OpeningProcess from "../../sellProcess/openingProcess/openingProcess";
import AdvanzedClosing from "../../sellProcess/closingProcess/advanzedClosing/advanzedClosing";
import CashOut from "../../cashOut/cashOut";
import CloseOperationsPeriod from "../../closeOperations/closePeriod";
import { useAuthStore } from "../../../shared";
import { ADMIN, CASHIER } from "../../tools/confirmPassword/lib";
import UseVerify from "../../../hooks/verifications/useVerify";
import { usePayStore } from "@/store/payments/payments.store";
import ConfirmChanges from "@/components/modals/confirm/confirmChanges";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}

export default function MainMenu({ isOpen, onClose, children }: Props) {
  const authData = useAuthStore((state) => state.authData);
  const allowRole = authData.payload.user.role.role.name;
  const sessionActive = authData.payload.user.cashierSession;
  // Modals
  const cashMoves = useModal(CASH_MOVES); // Componente de retiro de propinas
  const disableProducts = useModal(DISABLED_PRODUCTS);
  const cashierOpenSession = useModal(OPEN_CASHIER_SESSION);
  const cashierCloseSession = useModal(CLOSE_CASHIER_SESSION);
  const cashOutProcess = useModal(CASH_OUT_PROCESS);
  const closeOperations = useModal(CLOSE_OPERATIONS_PERIOD);
  const navigate = useNavigate();
  const { isCashierEnable } = UseVerify();
  const confirmChanges = useModal(CONFIRM_CHANGES);
  const isLoading = usePayStore((state) => state.isLoading);
  const errors = usePayStore((state) => state.errors);

  return (
    <div className={styles.screen}>
      <section className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="close-icon" />
        </button>
        <section>
          <img src={burgerMenu} alt="burger-menu" />
          <h2>Menú</h2>
        </section>
        <section>
          <button
            onClick={cashierOpenSession.openModal}
            disabled={!authData || allowRole != CASHIER || isCashierEnable}
          >
            <img src={menuTwo} alt="menu-icon" />
            Apertura de caja
          </button>
          <button onClick={cashOutProcess.openModal}>
            <img src={cashOutIcon} alt="menu-icon" />
            <span>Retiro parcial</span>
          </button>
          <button onClick={cashMoves.openModal}>
            <img src={tipsIcon} alt="tips-icon" />
            <span>Propinas</span>
          </button>
          <button>
            <img src={menuTwo} alt="menu-icon" />
            <span>Corte parcial</span>
          </button>
          <button
            onClick={cashierCloseSession.openModal}
            disabled={!isCashierEnable}
          >
            <img src={menuTwo} alt="menu-icon" />
            <span>Cierre de caja</span>
          </button>
          <button
            onClick={() => {
              navigate(`/${TABLES_CONTROL_PATH}`);
            }}
          >
            <img src={menuThree} alt="menu-icon" />
            <span>Control de mesas</span>
          </button>
          <button
            onClick={disableProducts.openModal}
            disabled={allowRole != ADMIN}
          >
            <img src={menuFour} alt="menu-icon" />
            <span>Desactivar Productos</span>
          </button>
          <button>
            <img src={menuFive} alt="menu-icon" />
            <span>Comedor de empleados</span>
          </button>
          <button
            onClick={() => {
              navigate("/biometrics");
            }}
          >
            <img src={menuSix} alt="menu-icon" />
            <span>Registro de huellas</span>
          </button>
          <button>
            <img src={menuEight} alt="menu-icon" />
            <span>Reservaciones</span>
          </button>
          <button
            onClick={() => {
              navigate("/reports");
            }}
          >
            <img src={menuNine} alt="menu-icon" />
            <span>Reportes</span>
          </button>
          <button onClick={closeOperations.openModal}>
            <img src={opertingIcon} alt="menu-icon" />
            <span>Cierre operativo</span>
          </button>
        </section>
      </section>
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
        <ConfirmChanges
          loading={isLoading}
          errors={errors}
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
        >
          Exitoso
        </ConfirmChanges>
      ) : null}
      {cashMoves.isOpen && cashMoves.modalName === CASH_MOVES ? (
        <CashMoves
          onClose={cashMoves.closeModal}
          openModal={confirmChanges.openModal}
        ></CashMoves>
      ) : null}
      {disableProducts.isOpen && disableProducts.modalName ? (
        <DisableProducts
          isOpen={disableProducts.isOpen}
          onClose={disableProducts.closeModal}
        >
          Desactivar productos
        </DisableProducts>
      ) : null}
      {cashierOpenSession.isOpen &&
      cashierOpenSession.modalName === OPEN_CASHIER_SESSION ? (
        <OpeningProcess
          onClose={cashierOpenSession.closeModal}
        ></OpeningProcess>
      ) : null}
      {cashierCloseSession.isOpen &&
      cashierCloseSession.modalName === CLOSE_CASHIER_SESSION ? (
        <AdvanzedClosing
          onClose={cashierCloseSession.closeModal}
          sessionActive={sessionActive}
        ></AdvanzedClosing>
      ) : null}
      {cashOutProcess.isOpen &&
      cashOutProcess.modalName === CASH_OUT_PROCESS ? (
        <CashOut
          onClose={cashOutProcess.closeModal}
          isOpen={cashOutProcess.isOpen}
        >
          {""}
        </CashOut>
      ) : null}
      {closeOperations.isOpen && closeOperations.modalName ? (
        <CloseOperationsPeriod
          isOpen={closeOperations.isOpen}
          onClose={closeOperations.closeModal}
        >
          ""
        </CloseOperationsPeriod>
      ) : null}
    </div>
  );
}
