import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  min-height: 100vh;
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Card_container = styled.div`
  width: 202px;
  height: 370px;
  display: flex;
  flex-direction: column;
  border: solid 1px gray;
  border-radius: 2%;
  position: relative;

  color: white;

  .card-price {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }
`;

export const Card_body = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;

  .card-price {
    position: relative;
    bottom: 50px;
    right: 0px;
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
  }
`;
