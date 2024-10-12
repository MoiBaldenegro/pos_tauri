import styles from "./cashierBox.module.css";
// Hooks
import tableFree from "../../assets/icon/tableForPayment.svg";
import { CashierBoxProps } from "../../types/props/cashierBoxProps";
import { useEffect } from "react";
// types
export default function CashierBox({
  openModal,
  item,
  setting,
  isNote,
}: CashierBoxProps) {
  const handleclick = () => {
    openModal();
    const itemWithNote = isNote ? { bill: item, note: isNote } : { bill: item };
    const itemDataSet = isNote ? itemWithNote : item;
    setting(itemDataSet);
  };

  return (
    <div className={styles.table} onClick={handleclick}>
      <div>
        <span>00.00</span>
        <span>
          <img src="" alt="" />
          04
        </span>
      </div>
      <img src={tableFree} alt="table-free" />
      <p>{item.tableNum}</p>
      <span>{item.user}</span>
      <div>
        <span>00.00</span>
        <span>
          <img src="" alt="" />
          04
        </span>
      </div>
    </div>
  );
}
