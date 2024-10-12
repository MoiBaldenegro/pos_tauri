import DiscountBoard from "../../discountBoard/discount";
import styles from "./billDiscounts.module.css";
import rightArrow from "../../../assets/icon/arrowRight.svg";
import table from "./../../../assets/icon/tableActive.svg";
import { useState } from "react";
import { GENERIC_KEYBOARD_ACTIVE } from "../../genericKeyboard/config";
import { GenericKeyboard } from "../../genericKeyboard/genericKeyboard";
import { useModal } from "../../../hooks/useModal";
import { BILL_DISCOUNTS } from "../../menus/mainMenu/moreActions/configs/constants";
import { useAuthStore } from "../../../shared";
import { UseActions } from "../../../store/moreActions/moreActions.store";
import { SET_PERCENT } from "../../discountBoard/constants";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function BillDiscount({ item, openModal, children }: Props) {
  const [mode, setMode] = useState<string>(SET_PERCENT);
  const [percent, setPercent] = useState("");
  const genericKeyboard = useModal(GENERIC_KEYBOARD_ACTIVE);

  const authData = useAuthStore((state) => state.authData);
  const user = authData.payload.user._id;
  const createDiscount = UseActions((state) => state.createDiscount);

  const data = {
    accountId: item.bill[0]._id,
    discountMount: percent,
    setting: mode,
    discountByUser: user,
    discountFor: "Validacion futura",
    cost: item.bill[0].checkTotal,
  };

  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3> Descuento a mesa: {item.tableNum}</h3>
            <div>
              <img src={table} alt="table-icon" className={styles.table} />
              <strong>{item.tableNum}</strong>
            </div>
          </div>
          <div>
            <h3>Ingresa descuento</h3>
            <DiscountBoard
              settingMode={setMode}
              mode={mode}
              percent={percent}
              setting={setPercent}
            >
              Descuentos en mesa
            </DiscountBoard>
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
            data={{}}
            payload={data}
            keyAction={BILL_DISCOUNTS}
            actionType={createDiscount}
          >
            Ingresa la descripción del descuento
          </GenericKeyboard>
        </>
      ) : null}
    </div>
  );
}
