import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;;
  place-items: center;
  gap: 20px;
  min-height: 100vh;
  background-color: #282d32;
  width: 400px;
  height: 1000px;
  border-radius: 13px;
  margin-top: 50px;
  margin-bottom: 50px;
  color: white;

  padding-bottom: 70px;
  input[type="text"] {
    background-color: #601860;
    border-color: #601860;
    margin: 5px;
    border-radius: 5px;
    text-align: center;
  }

  input[type="number"] {
    background-color: #601860;
    border-color: #601860;
    margin: 5px;
    border-radius: 5px;
    text-align: center;
    color: white;
  }

  input[type="file"] {
    display: none;
  }
  .arquivo {
    padding-left: 5px;
    padding-right: 5px;
    color: white ;
    background-color: #601860;
    border-radius: 5px;
    cursor: pointer;
  }

  .submit{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #601860;
    border-radius: 13px;
    border-color: #601860;
    margin: 5px;
  }
  
`;

export const Card_container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 9px;
  width: 220px;
  height: 310px;
  border-radius: 13px;
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
  background-color: #601860;
  padding: 5px;
  border-radius: 13px;

  img {
    border-radius: 13px;
    width: 200px;
  }
`;
