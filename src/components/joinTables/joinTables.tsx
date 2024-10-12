import styles from "./joinTables.module.css";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function JoinTables({ isOpen, onClose, children }: Props) {
  return (
    <main className={styles.screen}>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h1>jopin tables modal</h1>
      </div>
    </main>
  );
}
