// styles
import styles from "./headerTwo.module.css";
// Icons
import logo from "../../../assets/icon/logo.svg";
import logoDivider from "../../../assets/icon/logoDivider.svg";
import bulletIcon from "../../../assets/icon/bullet.svg";
import dividerIcon from "../../../assets/icon/dividerBtn.svg";
import signal from "../../../assets/icon/signal.svg";
import useDate from "../../../hooks/useDate";
import { useAuthStore } from "../../../store/auth/auth.store";

interface Props {
  sellType?: string | null;
}

export default function HeaderTwo({ sellType }: Props) {
  const authData = useAuthStore((state) => state.authData);
  // Date
  const { currentDateTime, opcionesFecha, opcionesHora }: any = useDate();
  const formattedFecha = currentDateTime.toLocaleDateString(
    "es-ES",
    opcionesFecha
  );
  const formattedHora = currentDateTime.toLocaleTimeString(
    "es-ES",
    opcionesHora
  );

  return (
    <header className={styles.head}>
      <div>
        <img src={logo} alt="logo" />
        <img src={logoDivider} alt="logo-divider" />
        <h3>PUNTO DE VENTA</h3>
      </div>
      {sellType ? <h2 className={styles.sellHead}>{sellType}</h2> : null}
      <div>
        <h3>{authData.payload?.user.employeeNumber}</h3>
        <h3>{`${authData.payload?.user.name.toUpperCase()} ${authData?.payload?.user?.lastName
          .slice(0, 1)
          .toUpperCase()}.`}</h3>
        <img src={bulletIcon} alt="bullet-icon" />
        <h3>{`${authData?.payload?.user?.role?.profileName}`}</h3>
        <img src={dividerIcon} alt="divider-icon" />
        <p>{formattedFecha}</p>
        <img src={dividerIcon} alt="divider-icon" />
        <p>{formattedHora}</p>
        <img src={dividerIcon} alt="divider-icon" />
        <img src={signal} alt="signal-icon" />
      </div>
    </header>
  );
}
