import styles from "./productCourtesy.module.css";
import rightArrow from "../../../assets/icon/arrowRight.svg";
import arrow from "../../../assets/icon/selectArrow.svg";
import divider from "../../../assets/icon/dividerTransfer.svg";
import { useEffect, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { GENERIC_KEYBOARD_ACTIVE } from "../../genericKeyboard/config";
import { GenericKeyboard } from "../../genericKeyboard/genericKeyboard";
import { COURTESY_APPLY_PRODUCTS } from "../../menus/mainMenu/moreActions/configs/constants";
import { SET_PERCENT } from "../../discountBoard/constants";
import { useAuthStore } from "../../../shared";
import { UseActions } from "../../../store/moreActions/moreActions.store";
import { calculateDiscount } from "@/lib/calculateDiscount";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function ProductsCourtesy({ item, openModal, children }: Props) {
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNote, setSelectedNote] = useState();
  const [productSelection, setproductSelection] = useState();
  const genericKeyboard = useModal(GENERIC_KEYBOARD_ACTIVE);

  const authData = useAuthStore((state) => state.authData);
  const user = authData.payload.user._id;
  const createDiscount = UseActions((state) => state.createDiscount);

  const productPrice =
    productSelection?.quantity > 1
      ? productSelection?.priceInSiteBill
      : productSelection?.priceInSite;

  const data = {
    accountId: item.bill[0].notes?.length < 0 ? selectedNote : item.bill[0]._id,
    discountMount: "100",
    setting: SET_PERCENT,
    discountByUser: user,
    discountFor: "Validacion futura",
    cost: productPrice,
  };

  const discountForBillRoute = {
    ...(selectedNote || item.bill[0]),
    products: (selectedNote || item.bill[0]).products?.map((element) => {
      if (element.unique === productSelection?.unique) {
        return {
          ...element,
          discount: data,
          priceInSite: "0.00",
          discountedAmount: calculateDiscount(
            parseFloat(data.cost),
            parseFloat(data.discountMount),
            data.setting
          ),
        };
      }
      return element;
    }),
    checkTotal: (
      parseFloat((selectedNote || item.bill[0]).checkTotal) -
      parseFloat(productSelection?.priceInSite)
    ).toString(),
  };

  useEffect(() => {
    if (item.bill[0].notes.length > 0) {
      setSelectedNote(item.bill[0].notes[0]);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3>Selecciona producto</h3>
            <div>
              <div className={styles.head}>
                <div>
                  {item.bill[0]?.notes.length < 0 ? (
                    <div className={styles.containerInput}>
                      <span>{`Mesa ${item.tableNum}`}</span>
                      <div className={styles.categoriesSelect}>
                        <div
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
                {selectedNote &&
                selectedNote.products &&
                selectedNote.products.length
                  ? selectedNote.products.map(
                      (element, index) =>
                        !element.discount && (
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
                        )
                    )
                  : item.bill[0]?.products.map((element, index) => (
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
                    ))}
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
            data={discountForBillRoute}
            payload={data}
            keyAction={COURTESY_APPLY_PRODUCTS}
            actionType={createDiscount}
          >
            Ingresa la descripción del descuento
          </GenericKeyboard>
        </>
      ) : null}
    </div>
  );
}
