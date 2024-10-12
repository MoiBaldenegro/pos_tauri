import styles from "./mojeCalculate.module.css";
import tipsCircle from "../../../../../assets/icon/tipsCircle.svg";
import printIcon from "../../../../../assets/icon/printIcon.svg";
import { useState } from "react";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  actionType: any;
  item: any;
  openModal: any;
  closeModal: any;
}

export default function MojeCalculate({
  isOpen,
  onClose,
  children,
  openModal,
  item,
  actionType,
  closeModal,
}: Props) {
  const [mojePercentage, setMojePercentage] = useState(0);
  const mojeAmount = (
    (parseFloat(item.tipAmount) * mojePercentage) /
    100
  ).toFixed(2);

  return (
    <main className={styles.screen}>
      <div>
        <div>
          <div>
            <img src={tipsCircle} alt="tips-icon" />
            <h3>{children}</h3>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div>
          <div>
            <h4>Empleado</h4>
            <h4>0178 María R.</h4>
          </div>
          <div>
            <h4>Venta total</h4>
            <h4>$20,000</h4>
          </div>
          <div>
            <h4>{"Moje (%)"}</h4>
            <input
              placeholder="0"
              type="number"
              onChange={(e) => {
                setMojePercentage(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <h4>Moje</h4>
            <h4>${mojeAmount}</h4>
          </div>
        </div>
        <button
          onClick={() => {
            const body = {
              moje: mojeAmount,
            };

            openModal();
            actionType(body);
            onClose();
          }}
        >
          <img src={printIcon} alt="print-icon" />
          Imprimir
        </button>
      </div>
    </main>
  );
}
// update
