import { ActionsKeyboard } from "../../../mainKeyboard/actionKeyboard";
import styles from "./moreActionsMenu.module.css";
import { actionsMenu, actionsTogoMenu } from "./configs/options";
import { useEffect, useState } from "react";
import {
  BILL_CANCEL,
  BILL_DISCOUNTS,
  BILL_NAME,
  COMMENTS,
  COURTESY_APPLY_BILL,
  COURTESY_APPLY_NOTES,
  COURTESY_APPLY_PRODUCTS,
  MOVE_PRODUCTS,
  MOVE_TABLE,
  NOTES_CANCEL,
  NOTES_DISCOUNTS,
  NOTES_NAME,
  PRODUCTS_CANCEL,
  PRODUCTS_DISCOUNTS,
  SEPARATE_CHECKS,
  TO_GO_PAYMENT,
} from "./configs/constants";
import tomateIcon from "../../../../assets/icon/tomatePOSlogo.svg";
import UseAccount from "../../../../hooks/useAccount";
import { useModal } from "../../../../hooks/useModal";
import ConfirmChanges from "../../../modals/confirm/confirmChanges";
import { CONFIRM_ACTIONS } from "../../../../configs/consts";
import SeparateChecks from "../../../separateChecks/separateChecks";
import TransferProducts from "../../../transferProducts/transferProducts";
import MoveTable from "../../../moveTable/moveTable";
import ProductsDiscounts from "../../../discounts/productsDiscounts/productsDiscounts";
import NotesDiscounts from "../../../discounts/notesDiscounts/notesDiscounts";
import BillDiscount from "../../../discounts/billDiscounts/billDiscounts";
import ProductsCourtesy from "../../../courtesy/productsCourtesy/productCourtesy";
import NotesCourtesy from "../../../courtesy/notesCourtesy/notesCourtesy";
import NotesCancellation from "../../../cancellations/noteCancellation/noteCancellation";
import ProductsCancel from "../../../cancellations/productCancellation/productCancellation";
import { ON_SITE_ORDER, TO_GO_ORDER } from "../../../../lib/orders.lib";
import { UseActions } from "../../../../store/moreActions/moreActions.store";
import ValidateAuthMessage from "./validate/validateAuth";
import { useAuthStore } from "../../../../shared";
import {
  ADD_BILL_COMMENTS_AUTH,
  CANCEL_BILL_AUTH,
  CANCEL_NOTE_AUTH,
  CANCEL_PRODUCT_AUTH,
  CHANGE_BILL_NAME_AUTH,
  CHANGE_NOTE_NAME_AUTH,
  COURTESY_BILL_AUTH,
  COURTESY_NOTE_AUTH,
  COURTESY_PRODUCTS_AUTH,
  DISCOUNT_BILL_AUTH,
  DISCOUNT_NOTES_AUTH,
  DISCOUNT_PRODUCTS_AUTH,
  MOVE_TABLE_AUTH,
  SEPARATE_NOTES_AUTH,
  TRANSFER_PRODUCTS_AUTH,
} from "../../../../lib/authorizations.lib";
import { TRANSFER_PRODUCTS_PATH } from "../../../../lib/routes.paths.lib";
import PaymentInterface from "@/components/payments/payments.int";
import GenericPaymentInterface from "@/components/genericPaymentInterface/genericPaymentInterface";
import { CASHIER } from "@/components/tools/confirmPassword/lib";
interface Props {
  isOpen: any;
  onClose: any;
  item: any;
  type: string;
  setRevolve?: any;
  setIsloading?: any;
  openModal?: any;
}

export default function MoreActionsMenu({
  onClose,
  item,
  type,
  setRevolve,
  setIsloading,
  openModal,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const updateCommentBill = UseActions((state) => state.updateComments);
  const cancelBill = UseActions((state) => state.cancelBill);
  const isLoading = UseActions((state) => state.isLoading);
  const updateNameNote = UseActions((state) => state.updateNameInNote);
  const errors = UseActions((state) => state.errors);
  const updateNameBill = UseActions((state) => state.updateName);
  const createDiscount = UseActions((state) => state.createDiscount);
  const authData = useAuthStore((state) => state.authData);
  const authorizations =
    authData?.payload?.user?.authorizations?.pos?.sellTypes?.restaurant ?? [];
  const allowRole = authData.payload.user.role.role.name;

  const confirmChanges = useModal(CONFIRM_ACTIONS);
  useEffect(() => {
    console.log(authorizations);
  }, []);
  return (
    <main className={styles.screen}>
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_ACTIONS ? (
        <ConfirmChanges
          loading={isLoading}
          errors={errors}
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
        >
          Cambios guardados
        </ConfirmChanges>
      ) : null}
      {!confirmChanges.isOpen && (
        <section className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          <div className={styles.actionsContainer}>
            {
              /* type && */ type === ON_SITE_ORDER &&
                actionsMenu.map((element, index) => (
                  <>
                    <button
                      key={index}
                      style={
                        selectedOption === element.set
                          ? { background: "white", color: "#000" }
                          : {}
                      }
                      onClick={() => {
                        setSelectedOption(element.set);
                      }}
                    >
                      {element.option}
                    </button>
                  </>
                ))
            }
            {
              /* type && */ type === TO_GO_ORDER &&
                actionsTogoMenu.map((element, index) => (
                  <>
                    <button
                      key={index}
                      style={
                        selectedOption === element.set
                          ? { background: "white", color: "#000" }
                          : {}
                      }
                      onClick={() => {
                        setSelectedOption(element.set);
                      }}
                    >
                      {element.option}
                    </button>
                  </>
                ))
            }
          </div>
          {selectedOption === BILL_NAME ? (
            <>
              {authorizations.includes(CHANGE_BILL_NAME_AUTH) ? (
                <ActionsKeyboard
                  option={selectedOption}
                  actionType={updateNameBill}
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  Ingresa el nombre de la cuenta:
                </ActionsKeyboard>
              ) : (
                <ValidateAuthMessage allow={false}>
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === NOTES_NAME ? (
            <>
              {item.bill[0].notes.length &&
              authorizations.includes(CHANGE_NOTE_NAME_AUTH) ? (
                <ActionsKeyboard
                  option={selectedOption}
                  actionType={updateNameNote}
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  Ingresa el nombre de la nota:
                </ActionsKeyboard>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(CHANGE_NOTE_NAME_AUTH)}
                >
                  No se encuentran notas activas
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === COMMENTS ? (
            <>
              {authorizations.includes(ADD_BILL_COMMENTS_AUTH) ? (
                <ActionsKeyboard
                  option={selectedOption}
                  actionType={updateCommentBill}
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  Agregar comentarios a la cuenta
                </ActionsKeyboard>
              ) : (
                <ValidateAuthMessage allow={false}>
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === SEPARATE_CHECKS ? (
            <>
              {authorizations.includes(SEPARATE_NOTES_AUTH) ? (
                <SeparateChecks
                  item={item}
                  openModal={confirmChanges.openModal}
                ></SeparateChecks>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(SEPARATE_NOTES_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === MOVE_PRODUCTS ? (
            <>
              {authorizations.includes(TRANSFER_PRODUCTS_AUTH) ? (
                <TransferProducts
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  ""
                </TransferProducts>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(TRANSFER_PRODUCTS_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === MOVE_TABLE ? (
            <>
              {authorizations.includes(MOVE_TABLE_AUTH) ? (
                <MoveTable item={item} openModal={confirmChanges.openModal}>
                  YEP
                </MoveTable>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(MOVE_TABLE_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === PRODUCTS_DISCOUNTS ? (
            <>
              {authorizations.includes(DISCOUNT_PRODUCTS_AUTH) ? (
                <ProductsDiscounts
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  YEP
                </ProductsDiscounts>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(DISCOUNT_PRODUCTS_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === NOTES_DISCOUNTS ? (
            <>
              {item.bill[0].notes.length &&
              authorizations.includes(DISCOUNT_NOTES_AUTH) ? (
                <NotesDiscounts
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  YEP
                </NotesDiscounts>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(DISCOUNT_NOTES_AUTH)}
                >
                  No se encuentran notas activas
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === BILL_DISCOUNTS ? (
            <>
              {authorizations.includes(DISCOUNT_BILL_AUTH) ? (
                <BillDiscount item={item} openModal={confirmChanges.openModal}>
                  YEP
                </BillDiscount>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(DISCOUNT_BILL_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === COURTESY_APPLY_PRODUCTS ? (
            <>
              {authorizations.includes(COURTESY_PRODUCTS_AUTH) ? (
                <ProductsCourtesy
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  YEP
                </ProductsCourtesy>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(COURTESY_PRODUCTS_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === COURTESY_APPLY_NOTES ? (
            <>
              {item.bill[0].notes.length &&
              authorizations.includes(COURTESY_NOTE_AUTH) ? (
                <NotesCourtesy item={item} openModal={confirmChanges.openModal}>
                  YEP
                </NotesCourtesy>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(COURTESY_NOTE_AUTH)}
                >
                  No se encuentran notas activas
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === COURTESY_APPLY_BILL ? (
            <>
              {authorizations.includes(COURTESY_BILL_AUTH) ? (
                <ActionsKeyboard
                  option={selectedOption}
                  actionType={createDiscount}
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  Ingresa descripcion de la cortesia:
                </ActionsKeyboard>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(COURTESY_BILL_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === PRODUCTS_CANCEL ? (
            <>
              {authorizations.includes(CANCEL_PRODUCT_AUTH) ? (
                <ProductsCancel
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  YEP
                </ProductsCancel>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(CANCEL_PRODUCT_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === NOTES_CANCEL ? (
            <>
              {item.bill[0].notes.length &&
              authorizations.includes(CANCEL_NOTE_AUTH) ? (
                <NotesCancellation
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  YEP
                </NotesCancellation>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(CANCEL_NOTE_AUTH)}
                >
                  No se encuentran notas activas
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === BILL_CANCEL ? (
            <>
              {authorizations.includes(CANCEL_BILL_AUTH) ? (
                <ActionsKeyboard
                  option={selectedOption}
                  actionType={cancelBill}
                  item={item}
                  openModal={confirmChanges.openModal}
                >
                  Ingresa descripcion de la cancelacion:
                </ActionsKeyboard>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(CANCEL_BILL_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : selectedOption === TO_GO_PAYMENT ? (
            <>
              {allowRole === CASHIER ? (
                <GenericPaymentInterface
                  handleLoading={setIsloading}
                  onClose={setSelectedOption}
                  currentBill={item}
                  setRevolve={setRevolve}
                  openModal={openModal}
                >
                  Pagar
                </GenericPaymentInterface>
              ) : (
                <ValidateAuthMessage
                  allow={authorizations.includes(CANCEL_BILL_AUTH)}
                >
                  No autorizado
                </ValidateAuthMessage>
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "1312px",
                fontSize: "32px",
              }}
            >
              {selectedOption === "" ? (
                <img
                  src={tomateIcon}
                  alt="tomate-icon"
                  style={{ height: "100px", margin: "25px" }}
                />
              ) : (
                <>
                  <strong>{selectedOption}: En construccion...</strong>
                  <img
                    src={tomateIcon}
                    alt="tomate-icon"
                    style={{ height: "100px", margin: "25px" }}
                  />
                </>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
