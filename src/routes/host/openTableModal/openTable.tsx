import { Table } from "@/routes/tablesControl/type";
import styles from "./openTable.module.css";
import CloseButton from "@/components/buttons/CloseButton/closeButton";
import incrementIcon from "@/assets/icon/incrementxl.svg";
import decrementIcon from "@/assets/icon/decrementIcon.svg";
import { useEffect, useState } from "react";
import UseTable from "@/hooks/useTable";
import { PENDING_STATUS } from "@/lib/tables.status.lib";
import { useAuthStore } from "@/shared";
import { UseTableStore } from "@/store/tables.store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: Table | undefined;
}

export default function OpenTable({ isOpen, onClose, item }: Props) {
  const { updateTable } = UseTable();
  const [clientNumber, setClientNumber] = useState(1);
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const enableTable = UseTableStore((state) => state.enableTable);

  return (
    <div className={styles.container}>
      {item?.server?.name.length <= 0 || !item?.user?.name ? (
        <div>
          <CloseButton onClose={onClose} />
          Esta mesa aun no ha sido asignada
        </div>
      ) : (
        <div>
          <CloseButton onClose={onClose} />
          <span>Ingresa el numero de comensales</span>
          <div>
            <div>
              <button
                disabled={clientNumber <= 1}
                onClick={() => setClientNumber(clientNumber - 1)}
              >
                <img src={decrementIcon} alt="decrement-icon" />
              </button>
              <span>{clientNumber}</span>
              <button
                disabled={clientNumber >= 99}
                onClick={() => setClientNumber(clientNumber + 1)}
              >
                <img src={incrementIcon} alt="increment-icon" />
              </button>
            </div>
            <button
              onClick={() => {
                enableTable(item?._id, { diners: clientNumber });
                logOutRequest();
              }}
            >
              Habilitar mesa {item?.tableNum}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
