// TicketComponent.jsx
import styles from "./mainTicket.module.css";
import tomateLogo from "./../../../../assets/icon/logoNegroOne.svg";

const TicketComponent = () => {
  return (
    <div className={styles.container}>
      <img src={tomateLogo} alt="tomate" />
      <h2>Ticket de Compra</h2>
      <p>Fecha: {new Date().toLocaleDateString()}</p>
      <p>Producto 1 - $10.00</p>
      <p>Producto 2 - $20.00</p>
      <p>Total: $30.00</p>
    </div>
  );
};

export default TicketComponent;
