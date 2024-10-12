import { Children, useState, useEffect } from "react";
import styles from "./shiftRegister.module.css";
import { keys } from "../../lib/components.lib";
import returnIcon from "../../assets/icon/returnIcon.svg";
import checkIcon from "../../assets/icon/buttonCheck.svg";
import fingerShiftIcon from "../../assets/icon/fingerShift.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setStyle: (arg: boolean) => void;
  children: string;
  openModal: () => void;
  settingEmployeeNumber: (arg: any) => void;
  employeeNumber: any;
}

export default function ShiftRegister({
  isOpen,
  onClose,
  setStyle,
  children,
  openModal,
  settingEmployeeNumber,
  employeeNumber,
}: Props) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      settingEmployeeNumber("");
      setStyle(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [settingEmployeeNumber, onClose, setStyle]);

  const handleKeyClick = (element: string) => {
    if (employeeNumber.length >= 4) {
      return;
    }
    const newValue = employeeNumber.concat(element);
    settingEmployeeNumber(newValue);
  };

  return (
    <main className={styles.screen}>
      <div>
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
        <div>
          <img src={fingerShiftIcon} alt="finger-icon" />
          <h4>Ingresar numero de empleado</h4>
        </div>
        <div className={styles.nums}>
          {employeeNumber.length > 0 &&
          employeeNumber.length < 2 &&
          employeeNumber.length === 1 ? (
            <div className={styles.sign}>
              <span>{employeeNumber.slice(0, 1)}</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          ) : employeeNumber.length > 1 &&
            employeeNumber.length < 3 &&
            employeeNumber.length === 2 ? (
            <div className={styles.sign}>
              <span>{employeeNumber.slice(0, 1)}</span>
              <span>{employeeNumber.slice(1, 2)}</span>
              <span>.</span>
              <span>.</span>
            </div>
          ) : employeeNumber.length > 2 &&
            employeeNumber.length < 4 &&
            employeeNumber.length === 3 ? (
            <div className={styles.sign}>
              <span>{employeeNumber.slice(0, 1)}</span>
              <span>{employeeNumber.slice(1, 2)}</span>
              <span>{employeeNumber.slice(2, 3)}</span>
              <span>.</span>
            </div>
          ) : employeeNumber.length > 3 &&
            employeeNumber.length < 5 &&
            employeeNumber.length === 4 ? (
            <div className={styles.sign}>
              <span>{employeeNumber.slice(0, 1)}</span>
              <span>{employeeNumber.slice(1, 2)}</span>
              <span>{employeeNumber.slice(2, 3)}</span>
              <span>{employeeNumber.slice(3, 4)}</span>
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
        <div>
          {keys.map((element, index) => (
            <button key={index} onClick={() => handleKeyClick(element)}>
              {element}
            </button>
          ))}
          <button onClick={() => settingEmployeeNumber("")}>
            <img src={returnIcon} alt="return-icon" />
          </button>
          <button onClick={() => handleKeyClick("0")}>0</button>
          <button
            disabled={employeeNumber.length < 4}
            className={styles.check}
            onClick={() => {
              openModal();
              onClose();
            }}
          >
            <img src={checkIcon} alt="check-Icon" />
          </button>
        </div>
      </div>
    </main>
  );
}
