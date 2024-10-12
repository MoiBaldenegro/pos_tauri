import styles from "./mainKeyboard.module.css";
import backspace from "../../../assets/icon/backspaceIcon.svg";
import minCheck from "../../../assets/icon/minCheck.svg";
import spaceIcon from "../../../assets/icon/spaceIcon.svg";
import cleanIcon from "../../../assets/icon/cleanIcon.svg";
import { useState } from "react";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  products: any;
  addProduct: (element: any) => void;
}

export default function MainKeyboard({
  isOpen,
  onClose,
  children,
  products,
  addProduct,
}: Props) {
  const [mayus, setMayus] = useState(true);
  const [text, setText] = useState("");
  const filterProducts = products.filter((element: any) => {
    return element.productName.toLowerCase().includes(text.toLocaleLowerCase());
  });

  const rowOne = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const rowTwo = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´", "/"];
  const rowThree = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "-"];
  const rowFour = ["Z", "X", "C", "V", "B", "N", "M", ",", "."];

  return (
    <main className={styles.container}>
      <section>
        <button
          className={styles.closeButton}
          onClick={() => {
            onClose();
          }}
        >
          X
        </button>
        <div className={styles.products}>
          {filterProducts?.map((element: any, index: any) => (
            <div
              className={styles.productBox}
              key={index}
              onClick={() => {
                addProduct(element);
              }}
            >
              <h5>{element.productName}</h5>
            </div>
          ))}
        </div>
        <article>
          <h1>{children}</h1>
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
              }}
            >
              <img src={cleanIcon} alt="clean-icon" />
            </button>
            <button
              className={styles.spaceBtn}
              onClick={() => {
                const newText = text.concat(" ");
                setText(newText);
                console.log(filterProducts);
              }}
            >
              <img src={spaceIcon} alt="space-icon" />
            </button>
            <button className={styles.checkBtn} onClick={onClose}>
              <img src={minCheck} alt="check-icon" />
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
