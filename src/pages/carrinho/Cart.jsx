import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  containerCart,
} from "../carrinho/Cart";


const Cart = () => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get('https://api-restful-trabalho-final-production.up.railway.app/api/pedidos');
      const cartItems = response.data;
      console.log(cartItems);

      if (cartItems.length > 0) {
        const { idPedido, cliente, valorTotal, itensPedidos } = cartItems[0];
        const { nome, cpf } = cliente;
        const { quantidade } = itensPedidos;

        const cartData = { idPedido, cliente: { nome, cpf }, itensPedidos: { quantidade }, valorTotal };
        setCartData(cartData);
      }
    } catch (error) {
      console.log("Erro:", error);
    }
  };

  return (
    <div id='containerCart'>
      <h2>Carrinho de Compras</h2>
      {cartData ? (
        <div>
          <p>idPedido: {cartData.idPedido}</p>
          <p>Cliente: {cartData.cliente.nome}</p>
          <p>CPF: {cartData.cliente.cpf}</p>
          <p>Valor Total: {cartData.valorTotal}</p>
          <p>Quantidade: {cartData.itensPedidos.quantidade}</p>
        </div>
      ) : (
        <p>Carregando dados do carrinho...</p>
      )}
    </div>
  );
};

export default Cart;
