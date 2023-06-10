import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ContentContainer,
  
} from "../carrinho/Cart.js";


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
    <ContentContainer className='containerCart'>
      <h1>Carrinho de Compras</h1>
      <info_body className='containerCaart'>
        {cartData ? (
          <div>
            <p>idPedido: {cartData.idPedido}</p>
            <p>Cliente: {cartData.cliente.nome}</p>
            <p>CPF: {cartData.cliente.cpf}</p>
            <p>Quantidade: {cartData.itensPedidos.quantidade}</p>
            <p id='Total'>Valor Total: {cartData.valorTotal}</p>
          </div>
        ) : (
          <p>Carregando dados do carrinho...</p>
        )}
      </info_body>
    </ContentContainer>
  );
};
export default Cart;
