import styles from "./closeButton.module.css";
import closeIcon from "@/assets/icon/closeIconButton.svg";

interface Props {
  onClose: () => void;
}

export default function CloseButton({ onClose }: Props) {
  return (
    <button className={styles.closeButton} onClick={onClose}>
      <img src={closeIcon} alt="close-icon" />
    </button>
  );
}
