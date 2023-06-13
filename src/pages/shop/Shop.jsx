import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
`;

const AddToCartButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e90000;
  border: none;
  cursor: pointer;
`;

const CartContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #a0accf;
  padding: 10px;
  border: 1px solid #ccc;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const CartItemName = styled.span`
  flex-grow: 1;
  margin-right: 10px;
`;

const CartItemQuantity = styled.span`
  margin-right: 10px;
`;

const CartItemButtons = styled.div`
  display: flex;
  align-items: center;
`;

const CartItemButton = styled.button`
  width: auto;
  margin-right: 5px;
  padding: 5px;
  background-color: #ee1212;
  border: none;
  cursor: pointer;
`;

const CheckoutButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #dd0b0b;
  border: none;
  cursor: pointer;
`;

function Shop() {
  const [prodList, setProdList] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = sessionStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api-restful-trabalho-final-production.up.railway.app/api/produtos"
        );
        setProdList(response.data);
      } catch (error) {
        console.log(error.response);
        setProdList([]);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //funcao pra  ve se o tem o produto no carrinho
  const addToCart = (prod) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.idProduto === prod.idProduto
    );


    if (itemIndex === -1) {
      setCartItems([...cartItems, { ...prod, quantity: 1 }]);
    } else {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    }
  };

  const removeFromCart = (prod) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.idProduto !== prod.idProduto
    );
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (prod) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.idProduto === prod.idProduto
    );
    updatedCartItems[itemIndex].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (prod) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.idProduto === prod.idProduto
    );

    if (updatedCartItems[itemIndex].quantity > 1) {
      updatedCartItems[itemIndex].quantity -= 1;
      setCartItems(updatedCartItems);
    } else {
      removeFromCart(prod);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.valorUnitario * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    console.log("Compra finalizada!");
  };

  return (
    <>
      <Container>
        <CardContainer>
          {prodList.map((prod) => (
            <Card key={prod.idProduto}>
              <CardImage
                src={`https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${prod.idProduto}/img`}
                alt={prod.nome}
              />
              <h5>{prod.nome}</h5>
              <p>{prod.descricao}</p>
              <h5>R$ {prod.valorUnitario}</h5>
              <AddToCartButton onClick={() => addToCart(prod)}>
                Adicionar ao Carrinho
              </AddToCartButton>
            </Card>
          ))}
        </CardContainer>
      </Container>

      {cartItems.length > 0 && (
        <CartContainer>
          <h3>Carrinho de Compras</h3>
          {cartItems.map((item) => (
            <CartItem key={item.idProduto}>
              <CartItemImage
                src={`https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${item.idProduto}/img`}
                alt={item.nome}
              />
              <CartItemName>{item.nome}</CartItemName>
              <CartItemButtons>
                <CartItemButton onClick={() => decreaseQuantity(item)}>
                  -
                </CartItemButton>
                <CartItemQuantity>{item.quantity}</CartItemQuantity>
                <CartItemButton onClick={() => increaseQuantity(item)}>
                  +
                </CartItemButton>
                <CartItemButton onClick={() => removeFromCart(item)}>
                  Remover
                </CartItemButton>
              </CartItemButtons>
            </CartItem>
          ))}
          <p>Total: R$ {calculateTotal()}</p>
          <CheckoutButton onClick={handleCheckout}>
            Finalizar Compra
          </CheckoutButton>
        </CartContainer>
      )}
    </>
  );
}

export default Shop;
