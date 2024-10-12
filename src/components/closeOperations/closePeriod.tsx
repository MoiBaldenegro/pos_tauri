import styles from "./closePeriod.module.css";
import periodCircle from "../../assets/icon/periodCircle.svg";
import dividerIcon from "../../assets/icon/divider0200.svg";
import backspace from "../../assets/icon/backspaceIcon.svg";
import nextArrow from "../../assets/icon/nextBtn.svg";
import btnIcon from "../../assets/icon/oparationsI.svg";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function CloseOperationsPeriod({
  isOpen,
  onClose,
  children,
}: Props) {
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "00"];

  return (
    <main className={styles.screen}>
      <div>
        <div>
          <div>
            <img src={periodCircle} alt="period-circle" />
            <h3>Cierre del periodo operativo</h3>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div>
          <div>
            <div>
              <div>
                <h3>Importe</h3>
                <img src={dividerIcon} alt="divider-icon" />
              </div>
              <div>
                <input type="text" placeholder="$0" />
                <h3>Efectivo</h3>
              </div>
            </div>
            <div>
              <div>
                {" "}
                <h3>Importe</h3>
                <img src={dividerIcon} alt="divider-icon" />
              </div>
              <div>
                <div>
                  <input type="text" placeholder="$0" />
                  <h3>Tarjeta de debito</h3>
                </div>
                <div>
                  {" "}
                  <input type="text" placeholder="$0" />
                  <h3>Tarjeta de crédito</h3>
                </div>
                <div>
                  {" "}
                  <input type="text" placeholder="$0" />
                  <h3>Transferencia</h3>
                </div>

                <div>
                  <h4>$0.00</h4>
                  <h3>Rappi</h3>
                </div>
                <div>
                  <h4>$0.00</h4>
                  <h3>Didi Food</h3>
                </div>
                <div>
                  <h4>$0.00</h4>
                  <h3>Uber Eats</h3>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3>Importe</h3>
                <img src={dividerIcon} alt="divider-icon" />
              </div>
              <div>
                <div>
                  <h4>$0.00</h4>
                  <h3>Retiros</h3>
                </div>
                <div>
                  <h4>$0.00</h4>
                  <h3>Propinas</h3>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                {keys.map((element) => (
                  <button key={element}>{element}</button>
                ))}
                <div>
                  <button className={styles.backspace}>
                    <img src={backspace} alt="backspace-icon" />
                  </button>
                  <button className={styles.next}>
                    <img src={nextArrow} alt="h" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3>Total</h3>
                <strong>$0,000,000.00 MXN</strong>
              </div>
              <button>
                <img src={btnIcon} alt="operations-icon" />
                Completar cierre
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
