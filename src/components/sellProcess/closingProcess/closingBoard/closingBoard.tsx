import styles from "./closingBoard.module.css";
import tillIcon from "../../../../assets/icon/tillIcon.svg";
import useDate from "../../../../hooks/useDate";
import crossButton from "../../../../assets/icon/crossButton.svg";
import backSpace from "../../../../assets/icon/backspaceIcon.svg";
import minCheck from "../../../../assets/icon/minCheck.svg";
import onlyTill from "../../../../assets/icon/onlyTill.svg";
import { useState } from "react";

export default function ClosingBoard() {
  const { currentDateTime, opcionesFecha, opcionesHora }: any = useDate();
  const formattedFecha = currentDateTime.toLocaleDateString(
    "es-ES",
    opcionesFecha
  );

  const [value, setValue] = useState("");
  /*  const formattedHora = currentDateTime.toLocaleTimeString(
    "es-ES",
    opcionesHora
  );

  }*/

  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "00"];

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.mapKeys}>
          {keys.map((element, index) => (
            <button
              onClick={() => {
                if (value.length >= 6) {
                  return;
                }
                setValue((prevValue) => {
                  return prevValue.concat(element);
                });
              }}
              className={styles.key}
              key={index}
            >
              {element}
            </button>
          ))}
        </div>
        <div className={styles.bottomButtons}>
          <button
            onClick={() => {
              setValue("");
            }}
          >
            <img src={backSpace} alt="backspace" />
          </button>
          <button>
            <img src={minCheck} alt="check" />
          </button>
        </div>
      </div>
    </div>
  );
}
