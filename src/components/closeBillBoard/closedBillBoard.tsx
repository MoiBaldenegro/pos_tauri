import styles from "./closedBillBoard.module.css";
import filterIcon from "../../assets/icon/filterIcon.svg";
import searchIcon from "../../assets/icon/searchIcon.svg";
import arrowOrder from "../../assets/icon/arrowOrder.svg";
import divider from "../../assets/icon/tableDivider002.svg";
import eyeIcon from "../../assets/icon/eyeIcon.svg";
import finallyIcon from "../../assets/icon/finallyBillsIcon.svg";

import {
  FilterType,
  OrderType,
  SELL_TYPE_ORDER,
  filters,
  headers,
} from "./lib";
import { useState } from "react";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function ClosedBillBoard({ isOpen, onClose, children }: Props) {
  const [order, setOrder] = useState<OrderType>(SELL_TYPE_ORDER);
  const [filter, setFilter] = useState<FilterType>("");
  return (
    <main className={styles.screen}>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div>
          <img src={finallyIcon} alt="tittle-icon" />
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
              {[...Array(15)].map((element) => (
                <div>
                  <h3>ex-restaurante</h3>
                  <h3>ex-034010</h3>
                  <h3>ex-0000 Alejandrina O</h3>
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
      </div>
    </main>
  );
}
