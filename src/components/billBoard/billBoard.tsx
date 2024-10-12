import styles from "./billBoard.module.css";
import openBillIcon from "../../assets/icon/billOpen.svg";
import filterIcon from "../../assets/icon/filterIcon.svg";
import searchIcon from "../../assets/icon/searchIcon.svg";
import printButton from "../../assets/icon/printIcon.svg";
import arrowOrder from "../../assets/icon/arrowOrder.svg";
import divider from "../../assets/icon/tableDivider001.svg";
import eyeIcon from "../../assets/icon/eyeIcon.svg";

import {
  FilterType,
  OrderType,
  SELL_TYPE_ORDER,
  filters,
  headers,
} from "./lib";
import { useEffect, useState } from "react";
import UseTable from "@/hooks/useTable";
import { UseTableStore } from "@/store/tables.store";
import { table } from "@/shared";
import { ENABLE_STATUS } from "@/lib/tables.status.lib";
import UseAccount from "@/hooks/useAccount";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function BillBoard({ isOpen, onClose, children }: Props) {
  const [order, setOrder] = useState<OrderType>(SELL_TYPE_ORDER);
  const [filter, setFilter] = useState<FilterType>("");
  const { handlePrint } = UseAccount();

  const getTables = UseTableStore((state) => state.getTables);
  const tableArray = UseTableStore((state) => state.tablesArray);
  const filterTables = tableArray.filter(
    (table) => table.status === ENABLE_STATUS
  );
  const accountEnables = filterTables.flatMap((table) => table.bill[0]);

  useEffect(() => {
    getTables();
    console.log(accountEnables);
  }, []);
  return (
    <main className={styles.screen}>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div>
          <img src={openBillIcon} alt="tittle-icon" />
          <h3>{children}</h3>
        </div>
        <div>
          <div>
            <div>
              {filters.map((element) => (
                <button
                  key={element.name}
                  onClick={() => {
                    setFilter(element.value);
                  }}
                  style={
                    filter === element.value
                      ? { background: "#ffffffa0", color: "black" }
                      : {}
                  }
                >
                  <img src={filterIcon} alt="filter-icon" />
                  {element.name}
                </button>
              ))}
            </div>
            <div>
              <img src={searchIcon} alt="search-icon" />
              <input type="text" placeholder="Buscar cuenta" />
            </div>
          </div>
          <div>
            <div>
              <div>
                {headers.map((element) => (
                  <div
                    key={element.name}
                    className={styles.headElement}
                    onClick={() => {
                      setOrder(element.value);
                    }}
                  >
                    {element.name}
                    <img
                      src={arrowOrder}
                      alt="arrow-order-icon"
                      style={order != element.value ? { opacity: "0.2" } : {}}
                    />
                  </div>
                ))}
                <div>
                  <div>Notas</div>
                </div>
              </div>
              <img src={divider} alt="table-divider" />
            </div>
            <div>
              {accountEnables.map((element) => (
                <div>
                  <h3>{element.sellType}</h3>
                  <h3>{element.billCode}</h3>
                  <h3>{element.user}</h3>
                  <h3>ex-$488.70</h3>
                  <h3>ex- 20:00</h3>
                  <h3>ex-4 min</h3>
                  <h3>ex-4</h3>
                  <h3>ex-En espera</h3>

                  <div>
                    <button>
                      <img src={eyeIcon} alt="details-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              console.log("ejecucion de impresion");
              console.log(accountEnables);
              if (accountEnables.length > 0) {
                for (const account of accountEnables) {
                  handlePrint("billPrint", account);
                }
              }
            }}
          >
            <img src={printButton} alt="" />
            Imprimir todas
          </button>
        </div>
      </div>
    </main>
  );
}
