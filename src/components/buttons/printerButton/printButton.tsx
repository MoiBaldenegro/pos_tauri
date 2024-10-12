import { useNavigate } from "react-router-dom";
import UseAccount from "../../../hooks/useAccount";
import UseTable from "../../../hooks/useTable";
import styles from "./printButton.module.css";
import { useEffect } from "react";
import UsePayment from "../../../hooks/usePayments";
import { UsePaymentsStore } from "../../../store/payments/paymenNote.store";
import { usePayStore } from "@/store/payments/payments.store";
import { PHONE_ORDER, RAPPI_ORDER, TO_GO_ORDER } from "@/lib/orders.lib";

interface Props {
  setRevolve: (value: string) => void;
  handleLoading: (value: boolean) => void;
  openModal: () => void;
  onClose: () => void;
  currentBill: any;
  diference: number;
  createCurrentPayment: any;
  isDelivery?: boolean;
  sellType?: string;
}
const PrintButton = ({
  isDelivery,
  setRevolve,
  handleLoading,
  openModal,
  onClose,
  currentBill,
  diference,
  createCurrentPayment,
  sellType: string,
}: Props) => {
  const createPay = usePayStore((state) => state.payTogo);
  const rappiPay = usePayStore((state) => state.payRappi);
  const phonePay = usePayStore((state) => state.payPhone);
  const { createPayment, errors } = UsePayment();
  const { handlePrint } = UseAccount();
  const { updateTable, getOneTable, currentTable } = UseTable();
  const { updateBill } = UseAccount();
  const navigate = useNavigate();
  const paymentNote = UsePaymentsStore((state) => state.paymentNote);
  const totalTips = createCurrentPayment?.transactions
    ?.flatMap((transaction) => transaction.tips || [])
    .reduce((acc, tip) => acc + (parseFloat(tip) || 0), 0);

  const revolveCalculate = totalTips
    ? diference * -1 - totalTips
    : diference * -1;

  useEffect(() => {
    getOneTable(currentBill?.table);
  }, []);

  return (
    <button
      disabled={diference > 0}
      onClick={() => {
        if (isDelivery) {
          console.log(createCurrentPayment);
          if (currentBill?.sellType === TO_GO_ORDER) {
            setRevolve(revolveCalculate.toFixed(2).toString());
            createPay(createCurrentPayment);
            openModal();
            return;
          }
          if (currentBill?.sellType === RAPPI_ORDER) {
            setRevolve(revolveCalculate.toFixed(2).toString());
            rappiPay(createCurrentPayment);
            openModal();
            return;
          }
          if (currentBill?.sellType === PHONE_ORDER) {
            setRevolve(revolveCalculate.toFixed(2).toString());
            phonePay(createCurrentPayment);
            openModal();
            return;
          }
          return;
        } else {
          if (currentBill?.note) {
            const constPay = {
              accountId: currentBill?.note?.accountId,
              body: {
                ...createCurrentPayment,
                difference: (diference * -1).toString(),
              },
            };
            setRevolve(revolveCalculate.toFixed(2).toString());
            paymentNote(currentBill.note._id, constPay);
            openModal();
            return;
          }
          handleLoading(true);
          onClose();
          const constPay = {
            ...createCurrentPayment,
            accountId: currentBill._id,
            difference: (diference * -1).toString(),
          };
          createPayment(constPay);
          if (!errors) {
            setTimeout(() => {
              handleLoading(false);
            }, 400);
            openModal();
            setRevolve(revolveCalculate.toFixed(2).toString());
            handlePrint("ticket", currentBill), onClose();
            return;
            //navigate("/"); ////////////vERIFICAR LA NAVEGACION
          }
          setTimeout(() => {
            handleLoading(false);
          }, 400);
          setRevolve("error");
          onClose();
          //navigate("/"); ////////////vERIFICAR LA NAVEGACION
        }
      }}
      className={styles.printBtn}
    >
      $ Pagar
    </button>
  );
};

export default PrintButton;
