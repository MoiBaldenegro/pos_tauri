import React, { useEffect, useRef, useState } from "react";
import styles from "./tablesLayOut.module.css";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { UseTableStore } from "../../store/tables.store";

interface Props {}

export default function TablesLayOut({}: Props) {
  const getTables = UseTableStore((state) => state.getTables);
  const mesas = UseTableStore((state) => state.tablesArray);
  const tables: any[] = [
    { id: 1, name: "table 01", draggable: true, color: "#80008067" },
    { id: 2, name: "table 02", draggable: true, color: "#04800067" },
    { id: 3, name: "table 03", draggable: false, color: "#160ca167" }, // Esta mesa no será arrastrable
    { id: 4, name: "table 05", draggable: true, color: "#0c6a167" }, // Esta mesa no será arrastrable
    { id: 5, name: "table 06", draggable: true, color: "#0c8aa167" }, // Esta mesa no será arrastrable
    { id: 6, name: "table 07", draggable: true, color: "#0c6ba167" }, // Esta mesa no será arrastrable
    { id: 7, name: "table 08", draggable: true, color: "#0c0aa187" },
    { id: 8, name: "table 09", draggable: true, color: "#0c6da167" },
  ];

  const [parentRef, tablesArray, setTablesArray, updateConfig] = useDragAndDrop<
    HTMLDivElement,
    any
  >(tables, {
    plugins: [animations({ duration: 250 })],
  });

  const [disabled, setDisabled] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);

    updateConfig({
      disabled: !disabled,
    });
  };
  const handleDrop = (newTablesArray: any[]) => {
    setTablesArray(newTablesArray);
    // Aquí podrías guardar el array reordenado en tu estado global, en localStorage, o enviarlo al servidor, etc.
  };
  useEffect(() => {
    console.log(mesas);
    getTables();
  }, []);
  return (
    <div className={styles.container}>
      <div ref={parentRef}>
        {tablesArray.map((table, index) => (
          <div
            key={table.id}
            className={styles.item}
            data-label={table.name}
            style={{ background: `${table.color}` }}
          >
            <h1>{table.name}</h1>
          </div>
        ))}
      </div>
      <button onClick={toggleDisabled}>
        {disabled ? "Enable" : "Disable"} drag and drop
      </button>
    </div>
  );
}
