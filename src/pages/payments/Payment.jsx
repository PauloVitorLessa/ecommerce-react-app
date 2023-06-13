import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const [paid, setPaid] = useState(false);

  const product = {
    price: 0.7,
    description: "teste",
  };

  const paypalOptions = {
    "client-id": "AUpdxl3_a0LpqFLg8qm8ZF5XyCIhVtxGMQ1nNYp5tJjxLJexV7gkZUoqfbon40nb97LGQ7WhbXJtIHiz",
    currency: "BRL",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: product.description,
          amount: {
            currency_code: "BRL",
            value: product.price,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      setPaid(true);
      console.log(details);
    });
  };

  return (
    <div className="Payment">
      {paid ? (
        <div>
          <h1>A tropa faz dinheiro com site</h1>
        </div>
      ) : (
        <>
          <h1>
            {product.description} por R${product.price}
          </h1>
          <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          </PayPalScriptProvider>
        </>
      )}
    </div>
  );
}

export default Payment;
