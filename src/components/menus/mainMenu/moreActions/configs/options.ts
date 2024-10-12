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
  TO_GO_CANCEL_ORDER,
  TO_GO_COMMENT,
  TO_GO_COURTESY_ORDER,
  TO_GO_COURTESY_PRODUCT,
  TO_GO_DISCOUNT_ORDER,
  TO_GO_DISCOUNT_PRODUCT,
  TO_GO_NAME_ORDER,
  TO_GO_PAYMENT,
  TO_GO_REPRINT_ORDER,
} from "./constants";

interface Action {
  option: string;
  set: string;
}
// spanish
export const actionsMenu: Action[] = [
  {
    option: "Nombre de la cuenta",
    set: BILL_NAME,
  },
  {
    option: "Comentarios",
    set: COMMENTS,
  },
  {
    option: "Nombre de las notas",
    set: NOTES_NAME,
  },

  {
    option: "Separar notas",
    set: SEPARATE_CHECKS,
  },
  {
    option: "Transferir productos",
    set: MOVE_PRODUCTS,
  },
  {
    option: "Cambiar mesa",
    set: MOVE_TABLE,
  },
  {
    option: "Descuentos en productos",
    set: PRODUCTS_DISCOUNTS,
  },
  {
    option: "Descuentos en notas",
    set: NOTES_DISCOUNTS,
  },
  {
    option: "Descuentos en cuenta",
    set: BILL_DISCOUNTS,
  },
  {
    option: "Cortesías de producto",
    set: COURTESY_APPLY_PRODUCTS,
  },
  {
    option: "Cortesías de nota",
    set: COURTESY_APPLY_NOTES,
  },
  {
    option: "Cortesía de cuenta",
    set: COURTESY_APPLY_BILL,
  },
  {
    option: "Cancelar productos",
    set: PRODUCTS_CANCEL,
  },
  {
    option: "Cancelar notas",
    set: NOTES_CANCEL,
  },
  {
    option: "Cancelar cuenta",
    set: BILL_CANCEL,
  },
];

export const actionsTogoMenu: Action[] = [
  {
    option: "Cobrar",
    set: TO_GO_PAYMENT,
  },
  {
    option: "Nombre de la cuenta",
    set: TO_GO_NAME_ORDER,
  },
  {
    option: "Comentarios",
    set: TO_GO_COMMENT,
  },
  {
    option: "Descuento en producto",
    set: TO_GO_DISCOUNT_PRODUCT,
  },
  {
    option: "Descuento en orden",
    set: TO_GO_DISCOUNT_ORDER,
  },
  {
    option: "Cortesia en producto",
    set: TO_GO_COURTESY_PRODUCT,
  },
  {
    option: "Cortesia en orden",
    set: TO_GO_COURTESY_ORDER,
  },
  {
    option: "Cancelar",
    set: TO_GO_CANCEL_ORDER,
  },
  {
    option: "Reimprimir",
    set: TO_GO_REPRINT_ORDER,
  },
];
