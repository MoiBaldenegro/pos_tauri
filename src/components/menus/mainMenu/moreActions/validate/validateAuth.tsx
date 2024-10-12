import styles from "./validateAuth.module.css";
import tomateIcon from "../../../../../assets/icon/tomatePOSlogo.svg";
import guardicon from "../../../../../assets/icon/guardicon.svg";

interface Props {
  message?: string;
  allow?: boolean;
  children: string;
}
export default function ValidateAuthMessage({
  message,
  allow,
  children,
}: Props) {
  return (
    <div className={styles.container}>
      {!allow ? (
        <div>
          <img src={guardicon} alt="guard-icon" />
          <h2>No autorizado</h2>
        </div>
      ) : (
        <h3>{children}</h3>
      )}

      <img
        src={tomateIcon}
        alt="tomate-icon"
        style={{ height: "100px", margin: "25px" }}
      />
    </div>
  );
}
