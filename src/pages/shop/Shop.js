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
