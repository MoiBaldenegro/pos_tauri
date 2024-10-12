import { useState } from "react";
import styles from "./tableBoard.module.css";
import backspace from "../../assets/icon/backspaceIcon.svg";
import checkIcon from "../../assets/icon/buttonCheck.svg";

interface Props {
  setting: (arg: any) => void;
}
export default function TableBoard({ setting }: Props) {
  const [value, setValue] = useState("");
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  return (
    <div className={styles.container}>
      <input type="text" value={value} />
      <div>
        {keys.map((element, index) => (
          <button
            onClick={() => {
              if (value.length <= 2) {
                setValue((prevValue) => {
                  return prevValue.concat(element);
                });
              }
            }}
            key={index}
          >
            {element}
          </button>
        ))}
        <button
          onClick={() => {
            setValue("");
          }}
        >
          <img src={backspace} alt="backspace" />
        </button>
        <button
          onClick={() => {
            if (value.length <= 2) {
              setValue((prevValue) => {
                return prevValue.concat("0");
              });
            }
          }}
        >
          {"0"}
        </button>
        <button
          className={styles.checkButton}
          onClick={() => {
            const setValue = value.length < 2 ? `0${value}` : value;
            setting(setValue);
          }}
        >
          <img src={checkIcon} alt="check-icon" />
        </button>
      </div>
    </div>
  );
}
