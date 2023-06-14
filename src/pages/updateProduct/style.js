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
    background: white;

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
  padding: 20px;
  border-radius: 13px;
  color: white;

  gap: 20px;

  ul{
    background-color: #601860;
    border-radius: 13px;
    border-color: #601860;
  }
`;

export const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    margin-bottom: 10px;
    background-color: #601860;
    border-color: #601860;
    border-radius: 20px;
  }
  button {
    padding: 8px 16px;
    margin-top: 9px;
    background-color: #ad7dd1;
    color: #282d32 ;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.4s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 7px 8px 14px 3px #601860;
  }
  }
`;

export const CategoriaListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Card_container = styled.div`
  display: flex;
  flex-direction: column;

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
    width: 200px;
    border-radius: 5px;
  }
`;
