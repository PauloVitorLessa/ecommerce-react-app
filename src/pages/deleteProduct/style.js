import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  place-items: center;
  gap: 20px;
  min-height: 100vh;
  padding-top: 50px;

  padding-bottom: 70px;

  h2{
    background-color:#282d32 ;
    padding: 10px;
    margin: 5px;
    border-radius: 13px;
    box-shadow:0px 0px 20px 5px #601860;
    color: white;
  }

  input[type="file"] {
    display: none;
  }
  .arquivo {
    padding-left: 5px;
    padding-right: 5px;
    border: solid 1px;
    cursor: pointer;
  }
`;

export const ProductsListContainer = styled.div`
  display: flex;
  place-items: center;
  flex-direction: column;
  height: 500px;
  

  ul {
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0;
    padding: 20px;
    list-style-type: none;
    background-color: #601860;
    border-radius: 13px;

    p {
      font-weight: bold;
    }

    li {
      cursor: pointer;

      &:hover {
        scale: 1.1;
      }
    }
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #282d32;
  padding: 13px;
  color: white;
  border-radius: 13px;
  box-shadow:0px 0px 20px 5px #601860;

  gap: 20px;
`;

export const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    margin-bottom: 10px;
  }
  button {
    margin-top: 20px;
  }
`;

export const CategoriaListContainer = styled.div`
  display: flex;
  flex-direction: column;
  
`;

export const Card_container = styled.div`
  display: flex;
  flex-direction: column;
  
  button{
    padding: 8px 16px;
    background-color: #ad7dd1;
    color: #282d32 ;
    border: none;
    border-radius: 20px;
    margin-top: 9px;
    cursor: pointer;
    transition: 0.4s;

    &:hover {
      transform: scale(1.1);
      box-shadow: 7px 8px 14px 3px #601860;
    }
  }
  
`;

export const Card_body = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  position: relative;

  .card-price {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }

  .card-id {
    position: absolute;
    top: -225px;
    right: 10px;
  }

  p {
    margin: 0;
  }
`;

export const Img_container = styled.div`
  display: flex;
  place-content: center;
  
  img {
    border-radius: 5px;
    width: 200px;
  }
`;
