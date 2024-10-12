// styles
import "../../styles/global/global.css";
import styles from "./sells.module.css";
// Icons
import dividerIcon from "../../assets/icon/dividerBtn.svg";
import backIcon from "../../assets/icon/backIcon.svg";
import table from "../../assets/icon/table.svg";
import ticket from "../../assets/icon/ticket.svg";
import cashSignal from "../../assets/icon/cashSignal.svg";
import burgerMenu from "../../assets/icon/burgerMenu.svg";
// Hooks
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
//Dependencies
import { useNavigate } from "react-router-dom";
import { useCurrentCommand } from "../../store/productsInOrder.store";
import { SellType } from "../../types/props/sellType";
import { useModal } from "../../hooks/useModal";
import MainMenu from "../../components/menus/mainMenu/mainMenu";
import { useAuthStore } from "../../store/auth/auth.store";
import { RAPPI, sells } from "../../lib/sellTypes.lib";
import {
  HOST_PATH,
  PHONE_PATH,
  RAPPI_PATH,
  RESTAURANT_PATH,
  TO_GO_PATH,
} from "../../lib/routes.paths.lib";
import {
  BILLBOARD_MODAL,
  CLOSED_BILLBOARD_MODAL,
  EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL,
  MAIN_MENU,
} from "../../lib/modals.lib";
import BillBoard from "../../components/billBoard/billBoard";
import ClosedBillBoard from "../../components/closeBillBoard/closedBillBoard";
import ExceptionMessages from "../../components/modals/exceptionMessages/exceptionMessages";
import UseCashierException from "../../hooks/exceptions/useCashierException";
import { useEffect } from "react";
import { billInitialState } from "../../configs/bills.initial.state";

export default function Sells() {
  //exceptions
  const cashierSessionException = useModal(
    EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL
  );

  const authData = useAuthStore((state) => state.authData);
  const navigate = useNavigate();
  const billCurrentCommand = useCurrentCommand(
    (state) => state.BillCommandCurrent
  );

  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const setBillCurrentCommand = useCurrentCommand((state) => state.setState);
  const handleclick = (item: SellType) => {
    setBillCurrentCommand({ ...billCurrentCommand, sellType: item.sellType });
    if (item.sellType === "onSite") {
      navigate(`/${RESTAURANT_PATH}`);
      return;
    }
    if (item.sellType === "toGo") {
      navigate(`/${TO_GO_PATH}`);
      return;
    }
    if (item.sellType === "rappi") {
      navigate(`/${RAPPI_PATH}`);
      return;
    }
    if (item.sellType === "phone") {
      navigate(`/${PHONE_PATH}`);
      return;
    }
  };

  // modals
  const mainMenu = useModal(MAIN_MENU);
  const billBoard = useModal(BILLBOARD_MODAL);
  const closedBillBoard = useModal(CLOSED_BILLBOARD_MODAL);

  UseCashierException(cashierSessionException.openModal);

  useEffect(() => {
    console.log(billCurrentCommand);
    setBillCurrentCommand(billInitialState);
  }, []);

  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSectionSell}>
        {sells.map((item) => (
          <section
            onClick={() => {
              handleclick(item);
            }}
          >
            <h2>{item.name}</h2>
            <div></div>
          </section>
        ))}
      </main>
      <footer>
        <button
          onClick={() => {
            logOutRequest();
          }}
        >
          <img src={backIcon} alt="back-icons" />
          Salir
        </button>
        <div>
          <button
            onClick={() => {
              navigate(`/${HOST_PATH}`);
            }}
          >
            <img src={table} alt="table-icon" />
            Mapa de mesas
          </button>
          <img src={dividerIcon} alt="divider-icon" />
          <button onClick={billBoard.openModal}>
            <img src={ticket} alt="ticket-icon" />
            Cuentas abiertas: <span>{[...Array(37)].length}</span>
          </button>
          <button onClick={closedBillBoard.openModal}>
            <img src={cashSignal} alt="cash-signal" />
            Cuentas finalizadas <span>{[...Array(1037)].length}</span>
          </button>
        </div>
        <button onClick={mainMenu.openModal}>
          <img src={burgerMenu} alt="burger-menu" />
          Menu
        </button>
      </footer>
      {mainMenu.isOpen && mainMenu.modalName === MAIN_MENU ? (
        <MainMenu onClose={mainMenu.closeModal} isOpen={mainMenu.isOpen}>
          Main Menu
        </MainMenu>
      ) : null}
      {billBoard.isOpen && billBoard.modalName === BILLBOARD_MODAL ? (
        <BillBoard isOpen={billBoard.isOpen} onClose={billBoard.closeModal}>
          Cuentas abiertas
        </BillBoard>
      ) : null}
      {closedBillBoard.isOpen &&
      closedBillBoard.modalName === CLOSED_BILLBOARD_MODAL ? (
        <ClosedBillBoard
          isOpen={closedBillBoard.isOpen}
          onClose={closedBillBoard.closeModal}
        >
          Cuentas finalizadas
        </ClosedBillBoard>
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
    </div>
  );
}
