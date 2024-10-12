import styles from "./keyboard.module.css";
// Icons
import returnIcon from "../../../assets/icon/returnIcon.svg";
import checkIcon from "../../../assets/icon/buttonCheck.svg";
// Dependencies
import { useNavigate } from "react-router-dom";

interface Props {
  set: (arg: any) => void;
  value: any;
  action: () => void;
}

export default function Pinboard({ set, value, action }: Props) {
  const navigate = useNavigate();
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <div className={styles.container}>
      {keys.map((element, index) => (
        <button
          key={index}
          onClick={() => {
            console.log(value.length);
            console.log(value);
            if (value?.length >= 4) {
              return;
            }
            const newValue = value?.concat(element);
            console.log(newValue);
            set(newValue);
          }}
        >
          {element}
        </button>
      ))}
      <button
        onClick={() => {
          set("");
        }}
      >
        <img src={returnIcon} alt="return-icon" />
      </button>
      <button
        onClick={() => {
          if (value?.length >= 4) {
            return;
          }
          const newValue = value?.concat("0");
          set(newValue);
        }}
      >
        0
      </button>
      <button
        disabled={value.length < 4}
        className={styles.check}
        onClick={() => {
          action();
        }}
      >
        <img src={checkIcon} alt="check-Icon" />
      </button>
    </div>
  );
}
