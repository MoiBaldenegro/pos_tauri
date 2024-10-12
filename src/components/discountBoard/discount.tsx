import { useState } from "react";
import styles from "./discount.module.css";
import backspace from "../../assets/icon/backspaceIcon.svg";
import { SET_PERCENT, SET_QUANTITY } from "./constants";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
  percent: string;
  setting: (args: any) => void;
  mode: string;
  settingMode: any;
  bool?: boolean;
}

export default function DiscountBoard({
  item,
  openModal,
  children,
  percent,
  setting,
  mode,
  settingMode,
  bool,
}: Props) {
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
  return (
    <div className={styles.container}>
      <div className={styles.indicator}>
        <input
          type="text"
          value={mode === SET_PERCENT ? `${percent}` : `${percent}`}
        />
        <span>{mode === SET_PERCENT ? "%" : "$"}</span>
      </div>
      <div>
        {mode === SET_QUANTITY ? (
          <>
            <div className={styles.keysContainer}>
              {keys.map((element, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (percent.length <= 5) {
                      setting((prevValue: any) => {
                        return prevValue.concat(element);
                      });
                    }
                  }}
                >
                  {element}
                </button>
              ))}
              <button>00</button>
            </div>
            <div>
              {mode === SET_QUANTITY ? (
                <>
                  <button
                    onClick={() => {
                      setting("");
                    }}
                  >
                    <img src={backspace} alt="backspace" />
                  </button>
                  <button
                    onClick={() => {
                      settingMode(SET_PERCENT);
                      setting("");
                    }}
                  >
                    %
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.keysContainer}>
              {keys.map((element, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (percent.length <= 5) {
                      setting((prevValue) => {
                        return prevValue.concat(element);
                      });
                    }
                  }}
                >
                  {element}
                </button>
              ))}
              <button disabled={mode === SET_PERCENT}>00</button>
            </div>
            <div>
              {mode === SET_PERCENT ? (
                <>
                  <button
                    onClick={() => {
                      setting("");
                    }}
                  >
                    <img src={backspace} alt="backspace" />
                  </button>
                  <button
                    onClick={() => {
                      settingMode(SET_QUANTITY);
                      setting("");
                    }}
                  >
                    $
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
