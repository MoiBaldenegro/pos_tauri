import styles from "./genericKeyboard.module.css";
import backspace from "../../assets/icon/backspaceIcon.svg";
import cleanIcon from "../../assets/icon/cleanIcon.svg";
import spaceIcon from "../../assets/icon/spaceIcon.svg";
import leftArrow from "../../assets/icon/backArrow.svg";
import disquetIcon from "../../assets/icon/disquetIcon.svg";
import {
  BILL_DISCOUNTS,
  COURTESY_APPLY_NOTES,
  COURTESY_APPLY_PRODUCTS,
  NOTES_CANCEL,
  NOTES_DISCOUNTS,
  PRODUCTS_CANCEL,
  PRODUCTS_DISCOUNTS,
} from "../menus/mainMenu/moreActions/configs/constants";
import { useState } from "react";

interface Props {
  children: string;
  actionType?: any;
  openModal: any;
  setValue?: any;
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  keyAction?: string;
  payload?: {};
  out: boolean;
}
export function GenericKeyboard({
  children,
  actionType,
  openModal,
  onClose,
  setValue,
  isOpen,
  data,
  keyAction,
  payload,
  out,
}: Props) {
  const [mayus, setMayus] = useState(true);
  const [text, setText] = useState("");

  const rowOne = ["", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const rowTwo = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´", "/"];
  const rowThree = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "-"];
  const rowFour = ["Z", "X", "C", "V", "B", "N", "M", ",", "."];

  return (
    <main className={styles.screen} style={out ? { left: "0%" } : {}}>
      <article className={styles.container}>
        <div className={styles.noteNav}>
          <strong>{children}</strong>
        </div>
        <input readOnly type="search" value={text} />
        <div className={styles.keys}>
          <div className={styles.rowOne}>
            {rowOne.map((element, index) => (
              <button
                className={styles.key}
                key={index}
                onClick={() => {
                  const newText = text.concat(element);
                  setText(newText);
                  if (setValue) {
                    setValue(newText);
                  }
                }}
              >
                {element}
              </button>
            ))}
            <button
              className={styles.backspace}
              onClick={() => {
                const newText = text.slice(0, -1);
                setText(newText);
                if (setValue) {
                  setValue(newText);
                }
              }}
            >
              <img src={backspace} alt="clean-button" />
            </button>
          </div>
          <div className={styles.rowTwo}>
            {rowTwo.map((element, index) => (
              <button
                className={styles.key}
                key={index}
                onClick={() => {
                  const newText = text.concat(
                    mayus ? element : element.toLowerCase()
                  );
                  setText(newText);
                  if (setValue) {
                    setValue(newText);
                  }
                  if (text.length >= 0 && text.length < 1 && mayus) {
                    setMayus(!mayus);
                  }
                }}
              >
                {mayus ? element : element.toLowerCase()}
              </button>
            ))}
          </div>
          <div className={styles.rowThree}>
            {rowThree.map((element, index) => (
              <button
                className={styles.key}
                key={index}
                onClick={() => {
                  const newText = text.concat(
                    mayus ? element : element.toLowerCase()
                  );
                  setText(newText);
                  if (setValue) {
                    setValue(newText);
                  }
                  if (text.length >= 0 && text.length < 1 && mayus) {
                    setMayus(!mayus);
                  }
                }}
              >
                {mayus ? element : element.toLowerCase()}
              </button>
            ))}
          </div>
          <div className={styles.rowFour}>
            <button
              className={styles.mayus}
              onClick={() => {
                setMayus(!mayus);
              }}
            >
              Bloq mayus
            </button>
            {rowFour.map((element, index) => (
              <button
                className={styles.key}
                key={index}
                onClick={() => {
                  const newText = text.concat(
                    mayus ? element : element.toLowerCase()
                  );
                  setText(newText);
                  if (setValue) {
                    setValue(newText);
                  }
                  if (text.length >= 0 && text.length < 1 && mayus) {
                    setMayus(!mayus);
                  }
                }}
              >
                {mayus ? element : element.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.spaceButtons}>
          <button
            className={styles.cleanBtn}
            onClick={() => {
              setText("");
              if (setValue) {
                setValue("");
              }
            }}
          >
            <img src={cleanIcon} alt="clean-icon" />
          </button>
          <button
            className={styles.spaceBtn}
            onClick={() => {
              const newText = text.concat(" ");
              setText(newText);
              if (setValue) {
                setValue(newText);
              }
            }}
          >
            <img src={spaceIcon} alt="space-icon" />
          </button>
          <button
            disabled={
              text.length <= 0 ||
              text.length > 45 ||
              keyAction === PRODUCTS_CANCEL
            }
            className={styles.checkBtn}
            onClick={() => {
              if (keyAction === "NEW_TOGO_ORDER") {
                actionType();
              }
              if (keyAction === NOTES_CANCEL) {
                actionType({ ...data, cancellationReason: text });
                openModal();
              }
              if (keyAction === PRODUCTS_DISCOUNTS) {
                const dataSend = {
                  ...payload,
                  discountReason: text,
                  discountType: PRODUCTS_DISCOUNTS,
                };
                const transferObject = {
                  accountApt: {
                    ...data,
                    checkTotal: data.products
                      .reduce(
                        (a, b) =>
                          a +
                          parseFloat(
                            b.quantity > 1 ? b.priceInSiteBill : b.priceInSite
                          ),
                        0
                      )
                      .toFixed(2)
                      .toString(),
                  },
                  body: dataSend,
                };
                actionType(transferObject);
                openModal();
              }
              if (keyAction === NOTES_DISCOUNTS) {
                const dataSend = {
                  ...payload,
                  discountReason: text,
                  discountType: NOTES_DISCOUNTS,
                };
                const transferObject = {
                  accountApt: data,
                  body: dataSend,
                };
                actionType(transferObject);
                openModal();
              }
              if (keyAction === BILL_DISCOUNTS) {
                const dataSend = {
                  ...payload,
                  discountReason: text,
                  discountType: BILL_DISCOUNTS,
                };
                const transferObject = {
                  accountApt: data,
                  body: dataSend,
                };
                actionType(transferObject);
                openModal();
              }
              if (keyAction === COURTESY_APPLY_PRODUCTS) {
                const dataSend = {
                  ...payload,
                  discountReason: text,
                  discountType: COURTESY_APPLY_PRODUCTS,
                };
                const transferObject = {
                  accountApt: data,
                  body: dataSend,
                };
                console.log(transferObject);
                actionType(transferObject);
                openModal();
              }
              if (keyAction === COURTESY_APPLY_NOTES) {
                const dataSend = {
                  ...payload,
                  discountReason: text,
                  discountType: COURTESY_APPLY_NOTES,
                };
                const transferObject = {
                  accountApt: data,
                  body: dataSend,
                };
                actionType(transferObject);
                openModal();
              }
            }}
          >
            <img
              className={styles.disquet}
              src={disquetIcon}
              alt="check-icon"
            />
          </button>
        </div>
        <div className={styles.addButtonsContainer}>
          <button onClick={onClose}>
            <img src={leftArrow} alt="left-arrow" />
            Regresar
          </button>
        </div>
      </article>
    </main>
  );
}
// no se esta enviando la nueva Prop totalDiscountQuantity hay que revisar por que.
