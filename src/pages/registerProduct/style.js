import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 20px;

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

export const Card_container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
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
  }
`;
