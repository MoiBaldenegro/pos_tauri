import styles from "./noteCancellation.module.css";
import rightArrow from "../../../assets/icon/arrowRight.svg";
import divider from "../../../assets/icon/dividerTransfer.svg";
import { useModal } from "../../../hooks/useModal";
import { GENERIC_KEYBOARD_ACTIVE } from "../../genericKeyboard/config";
import { GenericKeyboard } from "../../genericKeyboard/genericKeyboard";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../shared";
import { UseActions } from "../../../store/moreActions/moreActions.store";
import { NOTES_CANCEL } from "../../menus/mainMenu/moreActions/configs/constants";
import { ENABLE_STATUS } from "../../../lib/tables.status.lib";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function NotesCancellation({
  item,
  openModal,
  children,
}: Props) {
  const authData = useAuthStore((state) => state.authData);
  const [selectedNote, setSelectedNote] = useState();
  const genericKeyboard = useModal(GENERIC_KEYBOARD_ACTIVE);
  const managementNotes = item.bill[0]?.notes.filter(
    (element) => element.status === ENABLE_STATUS
  );
  const cancelNote = UseActions((state) => state.cancelBill);

  const requestData = {
    accountId: item.bill[0]._id,
    noteId: selectedNote,
    cancellationBy: authData.payload.user._id,
    cancellationFor: "Validacion futura",
  };
  const [cancelData, setCancelData] = useState({});

  useEffect(() => {
    setSelectedNote(item.bill[0].notes[0]);
    console.log(cancelData);
  }, [setCancelData]);

  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3>1.- Selecciona la nota</h3>
            <div>
              <div className={styles.head}>
                <div>
                  {item.bill[0]?.notes ? (
                    <span>{`Mesa ${item.tableNum}`}</span>
                  ) : null}
                  <img src={divider} alt="divider" />
                </div>
              </div>
              <div className={styles.productsContainer}>
                {item.bill[0]?.notes ? (
                  managementNotes.map((element, index) => (
                    <div className={styles.productBox} key={index}>
                      <span>
                        {element.noteName
                          ? element.noteName
                          : `Nota: ${element.noteNumber}`}
                      </span>
                      <input
                        type="radio"
                        name="notes"
                        onChange={() => {
                          setCancelData({
                            ...requestData,
                            noteId: element._id,
                          });
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className={styles.productBoxEmpty}>
                    <h2>Nota actualmente vacia</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button onClick={genericKeyboard.openModal}>
            <img src={rightArrow} alt="right-arrow" />
            Siguiente
          </button>
        </div>
      </div>
      {genericKeyboard.isOpen &&
      genericKeyboard.modalName === GENERIC_KEYBOARD_ACTIVE ? (
        <>
          <GenericKeyboard
            isOpen={genericKeyboard.isOpen}
            onClose={genericKeyboard.closeModal}
            openModal={openModal}
            data={cancelData}
            actionType={cancelNote}
            keyAction={NOTES_CANCEL}
          >
            Descripción de la cancelacion:
          </GenericKeyboard>
        </>
      ) : null}
    </div>
  );
}
