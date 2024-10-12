//styles
import "../../styles/global/global.css";
import styles from "./host.module.css";
// Icons
import pendingIcon from "../../assets/icon/pending.svg";
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
import freeIcon from "../../assets/icon/freeIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import backIcon from "@/assets/icon/backIcon.svg";
import homeIcon from "@/assets/icon/homeIcon.svg";
import tableIcon from "@/assets/icon/table.svg";
import disquetIcon from "@/assets/icon/disquetIcon.svg";
// Vars
import TableBox from "../../components/tableBox/tableBox";
import UseTable from "../../hooks/useTable";
import { useEffect, useState } from "react";
import { useAuthStore, useModal, useNavigate } from "../sells/imports";
import {
  CONFIRM_CHANGES,
  EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL,
} from "../../lib/modals.lib";
import ExceptionMessages from "../../components/modals/exceptionMessages/exceptionMessages";
import UseCashierException from "../../hooks/exceptions/useCashierException";
import { useOperationProcess } from "../../store/operatingPeriod/operatingPeriod.store";
import { SELL_TYPES_PATH } from "@/lib/routes.paths.lib";
import { ADMIN } from "@/components/tools/confirmPassword/lib";
import JoinTables from "@/components/joinTables/joinTables";
import { UseTableStore } from "@/store/tables.store";
import ConfirmChanges from "@/components/modals/confirm/confirmChanges";
import { DISABLE_MODAL, ENABLE_MODAL } from "./openTableModal/consts";
import OpenTable from "./openTableModal/openTable";
// Dependecies

export default function Host() {
  //////////////////////
  /*    Edit tables   */
  //////////////////////

  const [allowEdit, setAllowEdit] = useState(false);
  const [tableSelectedArray, setTableSelectedArray] = useState([]);
  const joinTables = UseTableStore((state) => state.joinTables);
  const [current, setCurrent] = useState(); // [2

  const [joinTableArray, setJoinTableArray] = useState([]);
  const loading = UseTableStore((state) => state.isLoading);
  const errors = UseTableStore((state) => state.errors);
  const confirmChanges = useModal(CONFIRM_CHANGES);

  const { tablesArray, getTables } = UseTable();
  const cashierSessionException = useModal(
    EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL
  );
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const navigate = useNavigate();

  const operationPeriod = useOperationProcess((state) => state.operatingPeriod);
  const cashierSession = operationPeriod[0]?.sellProcess;
  UseCashierException(cashierSessionException.openModal);
  const authData = useAuthStore((state) => state.authData);
  const allowRole = authData.payload.user.role.role.name;
  const joinTablesModal = useModal("JOIN_TABLES");
  const openTableModal = useModal(ENABLE_MODAL);
  useEffect(() => {
    getTables();
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <div
        className={allowEdit ? styles.backgroundRepeat : styles.noBackground}
      ></div>

      <main className={styles.mainSection}>
        {tablesArray?.map((item: any, index: any) => {
          return (
            <div className={styles.grid} key={index}>
              <TableBox
                current={current}
                setCurrent={setCurrent}
                item={item}
                isEdit={allowEdit}
                set={setTableSelectedArray}
                selectedArray={tableSelectedArray}
                joinedInInTable={joinTableArray}
                setting={setJoinTableArray}
                openModal={confirmChanges.openModal}
                enableTable={openTableModal.openModal}
              />
            </div>
          );
        })}
      </main>
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
        <ConfirmChanges
          errors={errors}
          loading={loading}
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
          actionType={logOutRequest}
        >
          Cambios guardados
        </ConfirmChanges>
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
      {joinTablesModal.isOpen &&
      joinTablesModal.modalName === "JOIN_TABLES" &&
      allowEdit ? (
        <JoinTables
          isOpen={joinTablesModal.isOpen}
          onClose={joinTablesModal.closeModal}
        >
          Join tables
        </JoinTables>
      ) : null}
      {openTableModal.isOpen && openTableModal.modalName === ENABLE_MODAL && (
        <OpenTable
          item={current}
          isOpen={openTableModal.isOpen}
          onClose={openTableModal.closeModal}
        ></OpenTable>
      )}
      <footer className={styles.footer}>
        <div>
          <button
            onClick={() => {
              logOutRequest();
            }}
          >
            <img src={backIcon} alt="back-icon" />
            Salir
          </button>
          <button
            disabled={allowRole != ADMIN}
            onClick={() => {
              navigate(`/${SELL_TYPES_PATH}`);
            }}
          >
            <img src={homeIcon} alt="home-icon" />
            Inicio
          </button>
        </div>
        <div>
          {allowEdit ? (
            <div>
              <button
                onClick={() => {
                  setAllowEdit(false);
                  setTableSelectedArray([]);
                }}
              >
                <img src={disquetIcon} alt="" />
                Cancelar
              </button>
              <button
                onClick={() => {
                  // setAllowEdit(false);
                  joinTables({
                    tables: tableSelectedArray,
                  });
                  confirmChanges.openModal();
                }}
              >
                <img src={disquetIcon} alt="" />
                Guardar
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                // joinTablesModal.openModal();
                setAllowEdit(true);
              }}
            >
              <img src={tableIcon} alt="" />
              Unir mesas
            </button>
          )}
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
