import styles from "./interactiveModal.module.css";
import warningIcon from "@/assets/icon/warning.svg";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function InteractiveModal({ isOpen, onClose, children }: Props) {
  return (
    <main className={styles.screen}>
      <div>
        <img src={warningIcon} alt="" />
        <h3>{children}</h3>
        <button onClick={onClose}>Entendido</button>
      </div>
    </main>
  );
}
