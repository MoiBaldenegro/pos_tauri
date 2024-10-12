import styles from "./productCancellation.module.css";
import rightArrow from "../../../assets/icon//disquetIcon.svg";
import addIcon from "../../../assets/icon/addIcon.svg";
import arrow from "../../../assets/icon/selectArrow.svg";
import divider from "../../../assets/icon/dividerTransfer.svg";
import dividerThree from "../../../assets/icon/divider003.svg";
import { useEffect, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { GENERIC_KEYBOARD_ACTIVE } from "../../genericKeyboard/config";
import { GenericKeyboard } from "../../genericKeyboard/genericKeyboard";
import { cancellationReasonStore } from "../../../store/cancellationReasons.store";
import { useAuthStore } from "../../../shared";
import { UseActions } from "../../../store/moreActions/moreActions.store";
import { PRODUCTS_CANCEL } from "../../menus/mainMenu/moreActions/configs/constants";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function ProductsCancel({ item, openModal, children }: Props) {
  const [active, setActive] = useState<string>();
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const [productSelection, setproductSelection] = useState();
  const genericKeyboard = useModal(GENERIC_KEYBOARD_ACTIVE);
  const [description, setDescription] = useState("");

  // zustand
  const cancellationReasonsArray = cancellationReasonStore(
    (state) => state.reasonsArray
  );
  const cancelProduct = UseActions((state) => state.cancelProduct);
  const getReasons = cancellationReasonStore((state) => state.getReasons);
  const managementProducts = (
    selectedNote?.products ||
    item.bill?.[0]?.products ||
    []
  ).filter((product) => product.unique !== productSelection?.unique);

  const authData = useAuthStore((state) => state.authData);
  const user = authData.payload.user._id;

  const disAmount =
    productSelection?.quantity > 1
      ? parseFloat(productSelection?.priceInSiteBill)
      : parseFloat(productSelection?.priceInSite);

  const dataSend =
    item.bill[0].notes.length > 0
      ? {
          aptAccount: { ...selectedNote, products: managementProducts },
          body: {
            accountId: item.bill[0]._id,
            noteId: selectedNote?._id,
            product: productSelection,
            cancellationBy: user,
            cancellationFor: "Pendiente",
            cancellationReason: active,
            description: description,
            cancelledAmount: disAmount,
          },
        }
      : {
          aptAccount: { ...item.bill[0], products: managementProducts },
          body: {
            accountId: item.bill[0]._id,
            product: productSelection,
            cancellationBy: user,
            cancellationFor: "Pendiente",
            cancellationReason: active,
            description: description,
            cancelledAmount: disAmount,
          },
        };

  useEffect(() => {
    getReasons();
    if (item.bill[0].notes.length > 0) {
      setSelectedNote(item.bill[0].notes[0]);
    }
    console.log(productSelection);
  }, [description]);

  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3>Selecciona producto</h3>
            <div>
              <div className={styles.head}>
                <div>
                  {item.bill[0]?.notes.length ? (
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
                            {item.bill[0]?.notes.map(
                              (element, index) =>
                                !element.discount && (
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
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <img src={divider} alt="divider" />
                </div>
              </div>
              <div className={styles.productsContainer}>
                {selectedNote &&
                selectedNote.products &&
                selectedNote.products.length
                  ? selectedNote.products.map((element, index) => (
                      <div className={styles.productBox} key={index}>
                        <span>{element.productName}</span>
                        <input
                          type="radio"
                          name="productSelection"
                          onChange={() => {
                            if (
                              setproductSelection &&
                              setproductSelection.unique === element.unique
                            ) {
                              return;
                            }
                            setproductSelection(element);
                          }}
                        />
                      </div>
                    ))
                  : item.bill[0].products.map((element, index) => (
                      <div className={styles.productBox} key={index}>
                        <span>{element.productName}</span>
                        <input
                          type="radio"
                          name="productSelection"
                          onChange={() => {
                            console.log(productSelection);
                            console.log(managementProducts);
                            console.log(disAmount);

                            if (
                              setproductSelection &&
                              setproductSelection.unique === element.unique
                            ) {
                              return;
                            }
                            setproductSelection(element);
                          }}
                        />
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className={styles.razons}>
            <h3>Selecciona el motivo</h3>
            <div>
              <div>
                <div>
                  <h4>Restar del inventario</h4>
                  <img src={dividerThree} alt="divider-003" />
                </div>
                <div>
                  {cancellationReasonsArray
                    .filter((item) => {
                      return item.substraction === true;
                    })
                    .map((element, index) => (
                      <button
                        onClick={() => {
                          setActive(element.reasonName);
                        }}
                        style={
                          active === element.reasonName
                            ? { background: "white", color: "black" }
                            : {}
                        }
                        key={index}
                      >
                        {element.reasonName}
                      </button>
                    ))}
                </div>
              </div>
              <div>
                <div>
                  <h4>Mantener en el inventario</h4>
                  <img src={dividerThree} alt="divider-003" />
                </div>
                <div>
                  {cancellationReasonsArray
                    .filter((item) => {
                      return item.substraction === false;
                    })
                    .map((element, index) => (
                      <button
                        onClick={() => {
                          setActive(element.reasonName);
                        }}
                        style={
                          active === element.reasonName
                            ? { background: "white", color: "black" }
                            : {}
                        }
                        key={index}
                      >
                        {element.reasonName}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button onClick={genericKeyboard.openModal}>
            <img src={addIcon} alt="right-arrow" />
            Agregar descripcion
          </button>
          <button
            disabled={!productSelection || !active}
            onClick={() => {
              cancelProduct(dataSend);
              openModal();
            }}
          >
            <img src={rightArrow} alt="right-arrow" />
            Guardar
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
            setValue={setDescription}
            keyAction={PRODUCTS_CANCEL}
          >
            Ingresa la descripción del descuento
          </GenericKeyboard>
        </>
      ) : null}
    </div>
  );
}
