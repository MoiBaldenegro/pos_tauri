import styles from "./addTips.module.css";
import cashIcon from "../../assets/icon/cashCircle.svg";
import minCheck from "@/assets/icon/minCheck.svg";
import backbtn from "@/assets/icon/backTwo.svg";
import { useEffect } from "react";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  actionType?: any;
  value?: any;
  setvalue?: any;
  openModal?: any;
  closeModal?: any;
  transaction?: any;
}

export default function AddTips({
  isOpen,
  onClose,
  children,
  actionType,
  value,
  setvalue,
  openModal,
  closeModal,
  transaction,
}: Props) {
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "00"];

  useEffect(() => {
    console.log(transaction);
  }, [isOpen]);

  return (
    <main className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div>
            <img src={cashIcon} alt="head-icon" />
            <span>Agregar propina</span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.board}>
          <div className={styles.input}>
            <input type="text" maxLength={6} value={value} />
            <span>$</span>
          </div>
          <div className={styles.pinboard}>
            <div className={styles.keys}>
              {keys.map((key) => (
                <button
                  key={key}
                  className={styles.key}
                  onClick={() => {
                    setvalue(value + key);
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
            <div>
              <button
                className={styles.backButton}
                onClick={() => {
                  setvalue(value.slice(0, -1));
                }}
              >
                <img src={backbtn} alt="back-icon" />
              </button>
              <button className={styles.percentButton}>%</button>
              <button
                className={styles.checkButton}
                onClick={() => {
                  actionType({ ...transaction, tips: value });
                  setvalue("");
                  onClose();
                }}
              >
                <img src={minCheck} alt="check-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
