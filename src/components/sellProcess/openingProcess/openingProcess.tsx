import { useState } from "react";
import SimpleCashierSession from "./SimpleCashierSession/simpleCashierSession";
import styles from "./openingProcess.module.css";

interface Props {
  onClose: () => void;
}

export default function OpeningProcess({ onClose }: Props) {
  const [process, setProcess] = useState(1);
  return (
    <main className={styles.screen}>
      <SimpleCashierSession onClose={onClose}></SimpleCashierSession>
    </main>
  );
}
