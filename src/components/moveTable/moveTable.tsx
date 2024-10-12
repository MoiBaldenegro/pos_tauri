import { Children, useEffect, useState } from "react";
import styles from "./moveTable.module.css";
import disquetIcon from "../../assets/icon/disquetIcon.svg";
import arrow from "../../assets/icon/selectArrow.svg";
import divider from "../../assets/icon/dividerTransfer.svg";
import { UseTableStore } from "../../store/tables.store";
import TableBoard from "../tableBoard/tableBoard";
import warningIcon from "../../assets/icon/actionsWarning.svg";
import table from "./../../assets/icon/tableFree.svg";
import { UseActions } from "../../store/moreActions/moreActions.store";
import { MoveTableDto } from "../../types/moreActions";
import { ENABLE_STATUS, FREE_STATUS } from "../../lib/tables.status.lib";
import { useModal } from "../../shared";
import { CONFIRM_CHANGES } from "../../lib/modals.lib";
import ConfirmChanges from "../modals/confirm/confirmChanges";

interface Props {
  children: string;
  item: any;
  openModal: () => void;
}
export default function MoveTable({ children, item, openModal }: Props) {
  // Zustand
  const getTablesArray = UseTableStore((state) => state.getTables);
  const tablesArray = UseTableStore((state) => state.tablesArray);
  const moveTableRequest = UseActions((state) => state.moveBill);
  const isLoading = UseActions((state) => state.isLoading);
  const errors = UseActions((state) => state.errors);
  const confirmChanges = useModal(CONFIRM_CHANGES);

  //states
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNote, setSelectedNote] = useState("seleccion");
  const [tableSearch, setTableSearch] = useState();
  const tableSelected = tablesArray.filter((element) => {
    return element.tableNum === tableSearch;
  });

  useEffect(() => {
    getTablesArray();
    if (item && item.bill[0] && item.bill[0]?.notes.length > 0) {
      setSelectedNote(item.bill[0]?.notes[0]);
    }
  }, []);
  return (
    <article className={styles.container}>
      <div className={styles.head}>
        <span>Cambio de mesa</span>
      </div>
      <div className={styles.mainSection}>
        <div>
          <div>
            <div className={styles.headContainerFirst}>
              {item.bill[0]?.notes.length > 0 ? (
                <div className={styles.containerInput}>
                  <span>{`Mesa ${item.tableNum}`}</span>
                  <div className={styles.categoriesSelect}>
                    <div
                      id="custom-select"
                      className={styles.customSelect}
                      onClick={() => {
                        setToggleStatus(!toggleStatus);
                      }}
                    >
                      <div className={styles.selectTrigger}>
                        <span>
                          {selectedNote ? (
                            <>
                              {selectedNote.noteName
                                ? selectedNote.noteName.slice(0, 12)
                                : selectedNote.noteNumber
                                ? `Nota ${selectedNote.noteNumber}`
                                : `Nota ${item.bill[0]?.notes[0]?.noteNumber}`}
                            </>
                          ) : (
                            "Notas"
                          )}
                        </span>
                        <img
                          src={arrow}
                          alt=""
                          className={styles.arrowSelect}
                        />
                      </div>
                      <div
                        className={
                          toggleStatus ? styles.options : styles.hidden
                        }
                      >
                        {item.bill[0]?.notes.map((element, index) => (
                          <span
                            className={styles.option}
                            onClick={() => {
                              setSelectedNote(element);
                            }}
                          >
                            {element.noteName
                              ? element.noteName
                              : `Nota ${element.noteNumber}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <img src={divider} alt="divider" />
            </div>
          </div>
          <div className={styles.productsContainer}>
            {(selectedNote?.products?.length
              ? selectedNote.products
              : item.bill[0].products
            ).map((element, index) => (
              <div className={styles.productBox} key={index}>
                <span>{element.productName}</span>
              </div>
            ))}
          </div>
          <div></div>
        </div>
        <div className={styles.selectTable}>
          <TableBoard setting={setTableSearch} />
        </div>
        <div>
          {tableSearch &&
          tableSearch.length > 0 &&
          (!tableSelected ||
            (tableSelected.length === 0 && tableSearch != "0")) ? (
            <div className={styles.warningMessage}>
              <img src={warningIcon} alt="warning-icon" />
              <h2
                className={styles.error}
              >{`Mesa número ${tableSearch} no se encuentra registrada`}</h2>
            </div>
          ) : item.tableNum === tableSelected[0]?.tableNum ? (
            <div className={styles.warningMessage}>
              <img src={warningIcon} alt="warning-icon" />
              <h2>{`No es posible cambiar a misma mesa`}</h2>
            </div>
          ) : tableSelected[0]?.status === ENABLE_STATUS ? (
            <div className={styles.warningMessage}>
              <img src={warningIcon} alt="warning-icon" />
              <h2>{`Esta mesa se encuentra ocupada`}</h2>
            </div>
          ) : (tableSelected[0] && tableSelected[0].status === "enable") ||
            (tableSelected[0] && tableSelected[0].status === "pending") ? (
            <div className={styles.transferContainer}>
              <div>
                <span>Transferir a:</span>
                <span className={styles.tableNumber}>
                  {tableSelected[0]?.tableNum}
                </span>
                <img src={table} alt="table" />
              </div>
            </div>
          ) : tableSelected.length && tableSelected[0]?.status != "enable" ? (
            <div className={styles.warningMessage}>
              <img src={warningIcon} alt="warning-icon" />
              <h2>{"La mesa no se encuentra activa en este momento"}</h2>
            </div>
          ) : (
            <h3>Ingresa número de mesa</h3>
          )}
        </div>
      </div>
      <div className={styles.footerSection}>
        <button
          onClick={() => {
            const dataDto: MoveTableDto = {
              item: item,
              receivingItem: tableSelected[0],
              idHost: item._id,
              dataHost: { bill: [], status: FREE_STATUS },
              receivingTableId: tableSelected[0]._id,
              receivingTable: {
                bill: [item.bill[0]._id],
                status: ENABLE_STATUS,
              },
            };
            moveTableRequest(dataDto);
            confirmChanges.openModal();
          }}
        >
          <img src={disquetIcon} alt="save-icon" />
          Guardar
        </button>
      </div>
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
        <ConfirmChanges
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
          loading={isLoading}
          errors={errors}
        >
          Cambio de mesa completado
        </ConfirmChanges>
      ) : null}
    </article>
  );
}
