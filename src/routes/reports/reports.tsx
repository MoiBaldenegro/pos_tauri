import styles from "./reports.module.css";
import reportsIcon from "../../assets/icon/reportsColorIcon.svg";
import closeIcon from "../../assets/icon/closeButton.svg";
import { Navigate, useNavigate } from "react-router-dom";
import divider from "../../assets/icon/Divider001.svg";
import largeDivider from "../../assets/icon/divider002.svg";
import printIcon from "../../assets/icon/printIcon.svg";
import { reports } from "./reports.var";
import search from "../../assets/icon/searchIcon.svg";

export default function Reports() {
  const navigate = useNavigate();
  return (
    <main className={styles.container}>
      <section>
        <div>
          <img src={reportsIcon} alt="reports-icon" />
          <h2>Reportes</h2>
          <button
            className={styles.closeButton}
            onClick={() => {
              navigate("/sell-types");
            }}
          >
            <img src={closeIcon} alt="close-icon" />
          </button>
        </div>
        <div>
          <div className={styles.firstContainer}>
            <input className={styles.customCalendarButton} type="date" />
            <h3>Categorías</h3>
            <img src={divider} alt="divider" />
            <button>Administración</button>
            <button>Caja</button>
            <button>Empleados</button>
            <button>Ventas</button>
          </div>
          <div className={styles.secondContainer}>
            <section>
              <img src={search} alt="search-icon" />
              <input
                type="text"
                placeholder="reportes de ventas... reporte de caja..."
              />
            </section>
            <div>
              <div>
                <h4>Imprimir</h4>
                <h4>Nombre del reporte</h4>
              </div>
              <img src={largeDivider} alt="divider" />
              <article>
                {reports?.map((element, index) => (
                  <div className={styles.reportBox} key={index}>
                    <button>
                      <img src={printIcon} alt="print-button" />
                    </button>
                    <span>{element.reportName}</span>
                  </div>
                ))}
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
