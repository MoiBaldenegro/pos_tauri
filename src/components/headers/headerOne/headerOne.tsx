import bullet from "../../../assets/icon/bullet.svg";
import useDate from "../../../hooks/useDate";
import styles from "./headerOne.module.css"

export default function HeaderOne() {
    // Date
    const { currentDateTime, opcionesFecha, opcionesHora }: any = useDate();
    const formattedFecha = currentDateTime.toLocaleDateString('es-ES', opcionesFecha);
    const formattedHora = currentDateTime.toLocaleTimeString('es-ES', opcionesHora);
    return (
        <div className={styles.head}>
            <p>{formattedFecha} <img src={bullet} alt="bullet-icon" /> {formattedHora}</p>
        </div>
    )
}