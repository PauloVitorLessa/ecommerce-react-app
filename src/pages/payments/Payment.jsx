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

  // const onApprove = (data, actions) => {
  //   return actions.order.capture().then((details) => {
  //     setPaid(true);
  //     console.log(details);
  //   });
  // };

//------------------------------------------------------------------


const getProductsFromSession = (session) => {
  const products = [];

  for (let i = 0; i < session.length; i++) {
    const product = session[i];
    products.push({
      id: product.idProduto,
      nome: product.nome,
      descricao: product.descricao,
      categoria: product.nomeCategoria,
      quantidade: product.quantity,
      valorUnitario: product.valorUnitario
    });
  }
  return products;
  console.log(products)
};



//============================================================

const onApprove = (data, actions) => {
return actions.order.capture().then((details) => {
  setPaid(true);
  console.log(details);

  const savedCartItems = sessionStorage.getItem("cartItems");
  if (savedCartItems) {
    const cartItems = JSON.parse(savedCartItems);

    const pedidos = cartItems.map((item) => {
      const pedido = {
        // Dados do pedido a serem enviados para a API 
      };

      return axios
        .post("https://api-restful-trabalho-final-production.up.railway.app/api/pedidos", pedido)
        .then((response) => response.data)
        .catch((error) => {
          console.error("Erro ao enviar solicitação para a API 'pedidos':", error);
        });
    });

    Promise.all(pedidos)
      .then((orderedItems) => {
        // Extrair os IDs dos pedidos criados
        const pedidoIDs = orderedItems.map((item) => item.id);

        const itensPedidos = cartItems.map((item, index) => {
          const itensPedido = {
            // Dados dos itens de pedido a serem enviados para a API "itensPedidos"
            pedidoId: pedidoIDs[index],
            // Outros dados dos itens de pedido
          };

          return axios
            .post("https://api-restful-trabalho-final-production.up.railway.app/api/itensPedidos", itensPedido)
            .then((response) => response.data)
            .catch((error) => {
              console.error("Erro ao enviar solicitação para a API 'itensPedidos':", error);
            });
        });

        return Promise.all(itensPedidos);
      })
      .then((orderedItensPedidos) => {
        console.log("Pedidos:", orderedItems);
        console.log("Itens de Pedidos:", orderedItensPedidos);
      })
      .catch((error) => {
        console.error("Erro ao enviar solicitações para a API:", error);
      });
  }
});
};




//--------------------------------------------------------------
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