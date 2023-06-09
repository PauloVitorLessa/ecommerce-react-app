import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('https://api-restful-trabalho-final-production.up.railway.app/api/pedidos');
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='container'>
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map(produto => (
            <li key={produto.id}>
              <p>{produto.nome}</p>
              <p>{produto.preco}</p>
              <p>{produto.quantidade}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
