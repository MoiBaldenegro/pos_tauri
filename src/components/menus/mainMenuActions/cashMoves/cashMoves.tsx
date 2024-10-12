import styles from "./cashMoves.module.css";
import cross from "../../../../assets/icon/crossButton.svg";
import tillOne from "../../../../assets/icon/tillMovesCircle.svg";
import orderIcon from "../../../../assets/icon/orderIcon.svg";
import divider from "../../../../assets/icon/dividerTips.svg";
import { useAuthStore, useModal } from "../../../../shared";
import { MOJE_CALCULATE } from "../../../../lib/modals.lib";
import MojeCalculate from "./mojeCalculate/mojeCalculate";
import { useUsersStore } from "@/store/users.store";
import { useEffect, useState } from "react";
import { usePayStore } from "@/store/payments/payments.store";
import { useOperationProcess } from "@/store/operatingPeriod/operatingPeriod.store";

interface Props {
  onClose: () => void;
  openModal: any;
}
export default function CashMoves({ onClose, openModal }: Props) {
  const mojeCalculate = useModal(MOJE_CALCULATE);
  const usersArray = useUsersStore((state) => state.usersArray);
  const getUsers = useUsersStore((state) => state.getUsers);
  const [selectUser, setSelectUser] = useState({});
  const authData = useAuthStore((state) => state.authData);
  const authUser = authData.payload.user._id;
  const currentPeriod = useOperationProcess((state) => state.operatingPeriod);
  const getPeriod = useOperationProcess((state) => state.getCurrentPeriod);
  const managementUsers = usersArray.filter((user) => user.tips.length > 0);
  const tipEnable = {
    tipAmount: selectUser?.tips
      ?.filter(
        (tip) => tip.paymentType === "debit" || tip.paymentType === "credit"
      )
      .reduce((acc, tip) => acc + parseFloat(tip.tips), 0)
      .toFixed(2)
      .toString(),
    waiter: selectUser._id,
    user: authUser,
  };

  const patTipsAction = usePayStore((state) => state.payTips);
  const mojeCalculateAction = usePayStore((state) => state.mojeCalculate);

  useEffect(() => {
    getPeriod();
    getUsers();
    console.log(currentPeriod[0]);
  }, []);

  return (
    <main className={styles.screen}>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={cross} alt="close-button" />
        </button>
        <div>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={cross} alt="close-button" />
          </button>
          <img src={tillOne} alt="till-icon" />
          <h3>Propinas</h3>
        </div>
        <div>
          <div>
            <div>
              <button>
                Usuario
                <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Propina debito
                <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Propina credito <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Propina total <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Pagado <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Restante <img src={orderIcon} alt="arrow-order" />
              </button>
            </div>
            <img src={divider} alt="divider" />
          </div>
          <div>
            {managementUsers.map((element) => (
              <div
                className={
                  selectUser._id === element._id
                    ? styles.userLine
                    : styles.hidden
                }
                key={element.id}
                onClick={() => setSelectUser(element)}
              >
                <h3>{`${element.name} ${element.lastName}`}</h3>
                <h3>
                  $
                  {element.tips
                    .filter((tip) => tip.paymentType === "debit")
                    .reduce((acc, tip) => acc + parseFloat(tip.tips), 0)
                    .toFixed(2)
                    .toString()}
                </h3>
                <h3>
                  $
                  {element.tips
                    .filter((tip) => tip.paymentType === "credit")
                    .reduce((acc, tip) => acc + parseFloat(tip.tips), 0)
                    .toFixed(2)
                    .toString()}
                </h3>
                <h3>
                  $
                  {element.tips
                    .filter(
                      (tip) =>
                        tip.paymentType === "debit" ||
                        tip.paymentType === "credit"
                    )
                    .reduce((acc, tip) => acc + parseFloat(tip.tips), 0)
                    .toFixed(2)
                    .toString()}
                </h3>
                <h3>$1,000.00</h3>
                <h3>$1,000.00</h3>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button disabled={!selectUser._id} onClick={mojeCalculate.openModal}>
            Calcular moje
          </button>
          <button
            disabled={!selectUser._id}
            onClick={() => {
              patTipsAction("1", { paymentType: "debit", tips: "1000" });
            }}
          >
            Retirar propina
          </button>
        </div>
      </div>
      {mojeCalculate.isOpen && mojeCalculate.modalName === MOJE_CALCULATE ? (
        <MojeCalculate
          closeModal={onClose}
          openModal={openModal}
          item={tipEnable}
          actionType={mojeCalculateAction}
          isOpen={mojeCalculate.isOpen}
          onClose={mojeCalculate.closeModal}
        >
          Calcular moje
        </MojeCalculate>
      ) : null}
    </main>
  );
}
