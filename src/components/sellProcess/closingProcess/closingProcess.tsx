import AdvanzedClosing from "./advanzedClosing/advanzedClosing";
import styles from "./closingProcess.module.css";

export default function ClosingProcess() {
  return (
    <main className={styles.screen}>
      <AdvanzedClosing></AdvanzedClosing>
    </main>
  );
}
