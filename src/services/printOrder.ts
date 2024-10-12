/* import axios from "axios";

export default function UseOrder() {
  const handlePrint = async () => {
    const printers = ["192.168.1.88", "192.168.1.82"];

    printers?.forEach(async (item) => {
      try {
        const data = {
          items: [
            {
              name: "Coca cola",
              quantity: 2,
              price: 10.99,
            },
            {
              name: "Producto 2",
              quantity: 1,
              price: 24.99,
            },
          ],
          total: 46.97,
          tcp: item,
        };
        await axios.post("http://localhost:8000/print/order", data);
        console.log("Ticket enviado para impresión");
      } catch (error) {
        console.error("Error al enviar el ticket para impresión", error);
      }
    });
  };

  return {
    handlePrint,
  };
}

*/
