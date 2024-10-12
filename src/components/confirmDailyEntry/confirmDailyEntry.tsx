import { useEffect, useState } from "react";
import styles from "./confirmDailyEntry.module.css";
import { keys } from "../../lib/components.lib";
import checkIcon from "../../assets/icon/minCheck.svg";
import returnIcon from "../../assets/icon/returnIcon.svg";
import { useEntryDaily } from "../../store/dailyRegisterStore";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  setStyle: (arg: boolean) => void;
  settingEmployeeNumber: (arg: any) => void;
  employeeNumber: string;
  openModal: () => void;
  createRegister: (employeeNumber: number, pinPos: number) => void;
}
export default function ConfirmEntryDaily({
  isOpen,
  onClose,
  children,
  setStyle,
  settingEmployeeNumber,
  employeeNumber,
  openModal,
  createRegister,
}: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      settingEmployeeNumber("");
      setStyle(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <main className={styles.screen}>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h1>{children}</h1>
        <main className={styles.screen}>
          <div className={styles.container}>
            <button
              className={styles.closeButton}
              onClick={() => {
                settingEmployeeNumber("");
                setStyle(false);
                onClose();
              }}
            >
              X
            </button>
            <h3>{children}</h3>
            <div className={styles.nums}>
              {value.length > 0 && value.length < 2 && value.length === 1 ? (
                <div className={styles.sign}>
                  <span>{value.slice(0, 1)}</span>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              ) : value.length > 1 && value.length < 3 && value.length === 2 ? (
                <div className={styles.sign}>
                  <span>{value.slice(0, 1)}</span>
                  <span>{value.slice(1, 2)}</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              ) : value.length > 2 && value.length < 4 && value.length === 3 ? (
                <div className={styles.sign}>
                  <span>{value.slice(0, 1)}</span>
                  <span>{value.slice(1, 2)}</span>
                  <span>{value.slice(2, 3)}</span>
                  <span>.</span>
                </div>
              ) : value.length > 3 && value.length < 5 && value.length === 4 ? (
                <div className={styles.sign}>
                  <span>{value.slice(0, 1)}</span>
                  <span>{value.slice(1, 2)}</span>
                  <span>{value.slice(2, 3)}</span>
                  <span>{value.slice(3, 4)}</span>
                </div>
              ) : (
                <div className={styles.sign}>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              )}
            </div>
            {keys.map((element, index) => (
              <button
                key={index}
                onClick={() => {
                  if (value?.length >= 4) {
                    return;
                  }
                  const newValue = value?.concat(element);
                  setValue(newValue);
                }}
              >
                {element}
              </button>
            ))}
            <button
              onClick={() => {
                setValue("");
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
                setValue(newValue);
              }}
            >
              0
            </button>
            <button
              disabled={value.length < 4}
              className={styles.check}
              onClick={() => {
                console.log(`valor de emplooyeeNuMBER ${employeeNumber}`);
                console.log(employeeNumber);
                console.log(`valor de value ${value}`);
                console.log(value);
                createRegister(parseInt(employeeNumber), parseInt(value));
                openModal();
                onClose();
              }}
            >
              <img src={checkIcon} alt="check-Icon" />
            </button>
          </div>
        </main>
      </div>
    </main>
  );
}
