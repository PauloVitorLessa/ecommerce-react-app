import React, { useState, useEffect } from "react";

function Payment() {
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = sessionStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = cartItems.reduce(
        (accumulatedTotal, item) =>
          accumulatedTotal + item.valorUnitario * item.quantity,
        0
      );
      setTotal(newTotal);
    };

    calculateTotal();
  }, [cartItems]);

  const handlePayment = () => {
    console.log("Pagamento processado com sucesso!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      handlePayment(); //
    }, 2000);
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div>
      <h2>Tela de Pagamento</h2>
      <p>Total a ser pago: R$ {total.toFixed(2)}</p>
      {/* Componentes adicionais para o pagamento */}
      <form onSubmit={handleSubmit}>
        <label>
          Número do cartão:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
        <label>
          Data de validade:
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </label>
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}

export default Payment;
