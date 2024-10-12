import { useState } from "react";
import styles from "./customSelect.module.css";
interface Props {
  options: any;
  onSelect: any;
}

const CustomSelect = ({ options, onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect}>
      <div
        className={`${styles.selectHeader} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption : "Mas acciones"}
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option: any) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => {
                handleOptionClick(option),
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
