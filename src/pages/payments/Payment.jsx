import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const [paid, setPaid] = useState(false);


  const calculateTotal = () => {
    let total = 0;
  
    const savedCartItems = sessionStorage.getItem("cartItems");
    if (savedCartItems) {
      const cartItems = JSON.parse(savedCartItems);
  
      if (cartItems.length > 0) {
        for (const item of cartItems) {
          const quantity = item.quantity || 1; //se nao tiver quantidade fica 1 
          total += item.valorUnitario * quantity;
        }
      }
    }
  
    return total;
  };
  

  const product = {
    price: calculateTotal(),
  
  };

  const paypalOptions = {
    "client-id": "AUpdxl3_a0LpqFLg8qm8ZF5XyCIhVtxGMQ1nNYp5tJjxLJexV7gkZUoqfbon40nb97LGQ7WhbXJtIHiz",
    currency: "BRL",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
         
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
          <h1>compra realizada</h1>
        
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