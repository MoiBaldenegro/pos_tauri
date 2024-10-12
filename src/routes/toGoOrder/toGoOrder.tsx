// Styles
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import "../../styles/global/global.css";
import styles from "../toGoOrder/toGoOrder.module.css";
// Icons
import enableOrder from "../../assets/icon/togoEnable.svg";
import paymentOrder from "../../assets/icon/togoPayment.svg";
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
import moreActionsIcon from "../../assets/icon/moreActionsIcon.svg";
import addIcon from "../../assets/icon/addIcon.svg";
import homeIcon from "../../assets/icon/homeIcon.svg";
import { useNavigate } from "react-router-dom";
import { SELL_TYPES_PATH } from "../../lib/routes.paths.lib";
import { useEffect, useState } from "react";
import { TO_GO_ORDER } from "../../lib/orders.lib";
import { useToGoOrders } from "../../store/orders/togoOrder.store";
import { useModal } from "../sells/imports";
import { CONFIRM_PAYMENT_MODAL, MORE_ACTIONS_MENU } from "../../lib/modals.lib";
import MoreActionsMenu from "../../components/menus/mainMenu/moreActions/moreActionsMenu";
import ConfirmPayment from "@/components/modals/confirmPayments/confirmPayments";
import { GENERIC_KEYBOARD_ACTIVE } from "@/components/genericKeyboard/config";
import { GenericKeyboard } from "@/components/genericKeyboard/genericKeyboard";
import { ENABLE_STATUS } from "@/lib/tables.status.lib";

export default function ToGoOrder() {
  const confirmPayment = useModal(CONFIRM_PAYMENT_MODAL);
  const [isLoading, setIsloading] = useState(false);
  const [revolve, setRevolve] = useState<string>("");
  // MODALS
  const moreActionMenu = useModal(MORE_ACTIONS_MENU);
  const getToGoOrders = useToGoOrders((state) => state.getOrders);
  const toGoOrdersArray = useToGoOrders((state) => state.toGoOrderArray);
  const [currentOrder, setCurrentOrder] = useState<any>();
  const navigate = useNavigate();
  const genericKeyboard = useModal(GENERIC_KEYBOARD_ACTIVE);
  const [orderName, setOrderName] = useState<string>("");

  const managementOrders = toGoOrdersArray?.filter((element) => {
    return element.status === ENABLE_STATUS;
  });

  const handleClick = (element: any) => {
    navigate("/restaurant-order/:item", {
      state: {
        toGoOrder: element,
        type: TO_GO_ORDER,
      },
    });
  };

  const setNewOrder = () => {
    navigate("/restaurant-order/:item", {
      state: { type: TO_GO_ORDER, orderName: orderName },
    });
  };

  useEffect(() => {
    getToGoOrders();
  }, []);

  return (
    <div className={styles.container}>
      <HeaderTwo sellType="Pedido Para Llevar" />
      <main className={styles.mainSection}>
        {managementOrders?.map((element) => (
          <div className={styles.orderBox}>
            {element.status === "enable" ? (
              <img src={enableOrder} alt="enable-order-icon" />
            ) : (
              <img src={paymentOrder} alt="payment-order-icon" />
            )}
            <span className={styles.timeValue}>{"#Time"}</span>
            <img
              onClick={() => {
                console.log(element);
                moreActionMenu.openModal();
                setCurrentOrder(element);
              }}
              className={styles.moreActions}
              src={moreActionsIcon}
              alt="more-actions-icon"
            />
            <div
              className={styles.userName}
              onClick={() => {
                handleClick(element);
              }}
            >
              <h3>{`00${element.code}`}</h3>

              <span>{element.user.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </main>
      <footer className={styles.footer}>
        <div>
          <button
            onClick={() => {
              navigate(`/${SELL_TYPES_PATH}`);
            }}
          >
            <img src={homeIcon} alt="home-icon" />
            Inicio
          </button>
        </div>
        <button
          onClick={() => {
            genericKeyboard.openModal();
          }}
        >
          <img src={addIcon} alt="add-icon" />
          Nueva cuenta
        </button>
        <div>
          <span>
            <img src={enableIcon} alt="enable-icon" />
            Activa
          </span>
          <span>
            <img src={paymentIcon} alt="payment-icon" />
            Por pagar
          </span>
        </div>
      </footer>
      {genericKeyboard.isOpen &&
      genericKeyboard.modalName === GENERIC_KEYBOARD_ACTIVE ? (
        <GenericKeyboard
          out={true}
          isOpen={genericKeyboard.isOpen}
          onClose={genericKeyboard.closeModal}
          openModal={() => {}}
          actionType={setNewOrder}
          keyAction="NEW_TOGO_ORDER"
          setValue={setOrderName}
        >
          Agregar nombre de la cuenta
        </GenericKeyboard>
      ) : null}
      {moreActionMenu.isOpen &&
      moreActionMenu.modalName === MORE_ACTIONS_MENU ? (
        <MoreActionsMenu
          type={TO_GO_ORDER}
          item={currentOrder}
          isOpen={moreActionMenu.isOpen}
          onClose={moreActionMenu.closeModal}
          setRevolve={setRevolve}
          setIsloading={setIsloading}
          openModal={confirmPayment.openModal}
        ></MoreActionsMenu>
      ) : null}
      {confirmPayment.isOpen &&
      confirmPayment.modalName === CONFIRM_PAYMENT_MODAL ? (
        <ConfirmPayment
          setIsLoading={setIsloading}
          revolve={revolve}
          isLoading={isLoading}
          isOpen={confirmPayment.isOpen}
          onClose={confirmPayment.closeModal}
        >
          {revolve}
        </ConfirmPayment>
      ) : null}
    </div>
  );
}
