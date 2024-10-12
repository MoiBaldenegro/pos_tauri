import { UseTableStore } from "@/store/tables.store";
import styles from "./splitTables.module.css";
interface Props {
  item: any;
  openModal: any;
}

export default function SplitTables({ item, openModal }: Props) {
  const splitTables = UseTableStore((state) => state.splitTables);
  return (
    <main className={styles.screen}>
      <h2
        onClick={() => {
          splitTables(item._id);
          openModal();
        }}
      >
        Separar mesas
      </h2>
    </main>
  );
}
