//styles
import "../../styles/global/global.css";
import styles from "./restaurant.module.css";
// Icons
import pendingIcon from "../../assets/icon/pending.svg";
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
import freeIcon from "../../assets/icon/freeIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import homeIcon from "../../assets/icon/homeIcon.svg";
import logOutIcon from "../../assets/icon/logOutIcon.svg";
// Vars
import TableBox from "../../components/tableBox/tableBox";
import { useEffect, useState } from "react";
import UseTable from "../../hooks/useTable";
import { useModal } from "../../hooks/useModal";
import { OPEN_MORE_ACTIONS } from "../../configs/consts";
import MoreActionsMenu from "../../components/menus/mainMenu/moreActions/moreActionsMenu";
// Dependecies
// Hooks
import { useAuthStore } from "../../store/auth/auth.store";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../components/tools/confirmPassword/lib";
import { ON_SITE_ORDER } from "../../lib/orders.lib";
import { SELL_TYPES_PATH } from "../../lib/routes.paths.lib";
import ExceptionMessages from "../../components/modals/exceptionMessages/exceptionMessages";
import { EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL } from "../../lib/modals.lib";
import UseCashierException from "../../hooks/exceptions/useCashierException";
import { useOperationProcess } from "../../store/operatingPeriod/operatingPeriod.store";
import { useCurrentCommand } from "../sells/imports";
import { initialState } from "../../components/payments/utils/initialState";

export default function Restaurant() {
  const getOperatingPeriod = useOperationProcess(
    (state) => state.getCurrentPeriod
  );
  const currentPeriod = useOperationProcess((state) => state.operatingPeriod);
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const navigate = useNavigate();
  const authData = useAuthStore((state) => state.authData);
  //! TODO SWR ✨
  // const { data } = useSWR()

  const [idTable, setIdTable] = useState();
  const { getTables, tablesArray } = UseTable();
  const openMoreActions = useModal(OPEN_MORE_ACTIONS);
  const avalaibleTables = authData?.payload?.user?.tables;
  const isAdmin =
    authData?.payload?.user?.role?.role.value === ADMIN ? true : false;

  const setSillCurrentCommand = useCurrentCommand((state) => state.setState);

  //exceptions
  const cashierSessionException = useModal(
    EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL
  );

  UseCashierException(cashierSessionException.openModal);
  useEffect(() => {
    getTables();
    return () => {
      setSillCurrentCommand({
        sellType: "n/A",
        user: "Moises",
        checkTotal: "0.00",
        products: [],
        status: "enable",
        tableNum: "s/N",
        table: undefined,
      });
    };
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo sellType="Restaurante" />
      <main className={styles.mainSection}>
        {openMoreActions.isOpen &&
        openMoreActions.modalName === OPEN_MORE_ACTIONS ? (
          <MoreActionsMenu
            type={ON_SITE_ORDER}
            isOpen={openMoreActions.isOpen}
            onClose={openMoreActions.closeModal}
            item={idTable}
          ></MoreActionsMenu>
        ) : null}
        {(isAdmin ? tablesArray : avalaibleTables)?.map((item: any) => (
          <div className={styles.grid}>
            <TableBox
              item={item}
              route={"/restaurant-order/:item"}
              openModal={openMoreActions.openModal}
              set={setIdTable}
            />
          </div>
        ))}
      </main>
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
              navigate(`/${SELL_TYPES_PATH}`);
            }}
          >
            <img src={homeIcon} alt="home-icon" />
            Inicio
          </button>
        </div>
        <div>
          <span>
            <img src={pendingIcon} alt="pending-icon" />
            En espera
          </span>
          <span>
            <img src={enableIcon} alt="enable-icon" />
            Activa
          </span>
          <span>
            <img src={paymentIcon} alt="payment-icon" />
            Por pagar
          </span>
          <span>
            <img src={freeIcon} alt="free-icon" />
            Libre
          </span>
        </div>
      </footer>
    </div>
  );
}
