import React, { useState, useEffect } from "react";
import axios from "axios";

import Loading from "../../assets/loading.png";
import carrinho from "../../assets/carrinho-de-compras.png";
import { Link } from "react-router-dom";
import {
  Container,
  CardContainer,
  AddToCartButton,
  CartContainer,
  CartItem,
  CartItemImage,
  CartItemName,
  CartItemQuantity,
  CartItemButtons,
  CartItemButton,
  CheckoutButton,
  LoadingContainer,
  ProdutosConteiner,
  ToggleCartButton,
} from "./Shop.js";

function Shop() {
  const [prodList, setProdList] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [filtroMaior, setFiltroMaior] = useState(1000);
  const [filtroMenor, setFiltroMenor] = useState(0);
  const [cartVisible, setCartVisible] = useState(true);

  useEffect(() => {
    const savedCartItems = sessionStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    //checar se tem um user
    const handleCheckout = () => {
      const user = sessionStorage.getItem("user");
      if (!user) {
        alert("Faça o login primeiro!");
      } else {
        console.log("Compra finalizada!");
        history.push("/payments");
      }
    };

    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-restful-trabalho-final-production.up.railway.app/api/produtos"
        );
        setProdList(response.data);
        setLoading(false);
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

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <>
      <Container className="container-md">
        <LoadingContainer>
          {loading ? (
            <img className="loading" src={Loading} alt="loading"></img>
          ) : (
            <ProdutosConteiner>
              <div className="filtro">
                <h4>Filtros de preço:</h4>
                <h6>Maior valor:</h6>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={filtroMaior}
                  onChange={(e) => setFiltroMaior(e.target.value)}
                />{" "}
                <br /> <br />
                <h6>Menor valor:</h6>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={filtroMenor}
                  onChange={(e) => setFiltroMenor(e.target.value)}
                />
              </div>
              {prodList
                .filter(
                  (prod) =>
                    (prod.valorUnitario < filtroMaior + 1) &
                    (prod.valorUnitario > filtroMenor - 1)
                )
                .map((produto) => {
                  return (
                    <CardContainer key={produto.idProduto}>
                      <div className="Card">
                        <img
                          src={`https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${produto.idProduto}/img`}
                          alt={produto.nome}
                        />
                        <div className="cardBody">
                          <h6 className="card-title">{produto.nome}</h6>
                          <p className="card-descrition">{produto.descricao}</p>
                        </div>
                        <h6 className="card-price">
                          R$ {produto.valorUnitario}
                        </h6>
                        <AddToCartButton onClick={() => addToCart(produto)}>
                          <img src={carrinho} alt={carrinho} />
                        </AddToCartButton>
                      </div>
                    </CardContainer>
                  );
                })}
            </ProdutosConteiner>
          )}
        </LoadingContainer>

        {cartItems.length > 0 && cartVisible && (
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
            <Link to="/payments" />

            {sessionStorage.getItem("user") ? (
              <Link to="/payments">
                <CheckoutButton onClick={handleCheckout}>
                  Finalizar Compra
                </CheckoutButton>
              </Link>
            ) : (
              <button onClick={() => alert("Faça o login primeiro!")}>
                Finalizar Compra
              </button>
            )}
          </CartContainer>
        )}
      </Container>
      <ToggleCartButton onClick={toggleCartVisibility}>
        {cartVisible ? "Esconder Carrinho" : "Mostrar Carrinho"}
      </ToggleCartButton>
    </>
  );
}

export default Shop;
