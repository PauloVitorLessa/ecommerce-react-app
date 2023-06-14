import styled, { keyframes } from "styled-components";

const girando = keyframes`
 0%{
  transform: rotate(0);
 }
 100%{
  transform: rotate(360deg);
 }
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-color: #282d32;
  max-width: 100%;
  border-radius: 13px;
  margin: 30px;
  padding: 15px;
  box-shadow:0px 0px 20px 5px #601860;
  color: white;

  .loading{
    display: flex;
    align-items: center;
    text-align: center;
    height: 20px;
    width: 20px;
  
    animation-name: ${girando};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
`;

export const ProdutosConteiner = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
  gap: 25px;

  .filtro{
    width: 202px;
    height: 490px;
    background-color: #601860;
    border-radius: 13px;
    margin: 10px;
    padding: 10px;
    bottom: 0px;
    left: 10px;

    input{
      border-radius: 5px;
      border-color: #601860;
      text-align: center;
    }
  }

`;

export const CardContainer = styled.div`
  width: 202px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #601860;
  border:2px solid #601860;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  transition: 0.4s;


  color: white;

  img {
    width: 200px;
    border-radius: 5px;
  }

  .cardBody{
    display: flex;
    padding: 10px;
    flex-direction: column;
  }

  .card-price {
    position: absolute;
    bottom: 0px;
    right: 10px;
    overflow: hidden;
  }

  .card-descrition{
    margin-top: 6px;
    overflow: scroll;
    background-color: #282d32;
    width: 180px;
    height: 120px;
    border-radius: 13px;
    font-size: 12px;
    border: 2px solid #ad7dd1;
    ::-webkit-scrollbar{
      display: none;
    }
  }

  :hover{
  transform: scale(1.1);
  background-color: #ad7dd1;
  border: #ad7dd1;
  color: #282d32;
  font-weight: bold;

  .card-descrition{
    color: white;
    font-weight: normal;
    border: 2px solid #601860;
  }
 }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
`;

export const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 10px;
  width: 10px;
  position: absolute;
  bottom: 0px;
  left: 10px;
  background-color: #282d32;
  border: 2px solid #282d32;
  margin: 5px;
  transition: 0.6s;
  cursor: pointer;

  img{
    height: 15px;
    width: 15px;
  }

  :hover{
    background-color: #601860;
    transform: scale(1.3);
    border: 2px solid #601860;
  }
`;

export const CartContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 10px;
  background-color: #ad7dd1;
  padding: 10px;
  border: 2px solid #282d32;
  border-radius: 13px;
  height: 500px;
  overflow-y: auto;  
  
  h4{
    text-align: center;
    border-radius: 13px;
    background-color: #282d32;
    color: white;
    padding: 10px;
    margin: 10px;
  }
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
`;

export const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 2px solid #601860;
  border-radius: 10px;
  margin-right: 10px;
`;

export const CartItemName = styled.span`
  flex-grow: 1;
  margin-right: 10px;
`;

export const CartItemQuantity = styled.span`
  margin-right: 10px;
`;

export const CartItemButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const CartItemButton = styled.button`
  width: auto;
  margin-right: 5px;
  padding: 5px;
  background-color: #282d32;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

export const CheckoutButton = styled.button`
  text-align: center;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #282d32;
  border: none;
  cursor: pointer;
`;

export const ToggleCartButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #ad7dd1;
  padding: 10px;
  border: 2px solid #282d32;
  cursor: pointer;
`;