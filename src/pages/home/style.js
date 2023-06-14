import styled, { keyframes } from "styled-components";

const girando = keyframes`
 0%{
  transform: rotate(0);
 }
 100%{
  transform: rotate(360deg);
 }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
`;

export const CarrosselConteiner = styled.div`
  display: flex;
  max-width: 95%;
  background-color: #282d32;
  max-width: 1366px;
  border-radius: 13px;
  padding: 0.8%;
  box-shadow:0px 0px 20px 5px #601860;

  .inner{
    display: flex;
  }
  
  .item{
    min-height: 435px;
    min-width: 700px;
    padding: 13px;
  }

  .item img{
    width: 100%;
    height: 100%;
    border-radius: 13px;
    pointer-events: none;
  }

  .carousel{
    cursor: grab;
    overflow: hidden;
  }
`;


export const ProdutosConteiner = styled.div`
display: flex;
  justify-content: center;
 
  flex-direction: row;
  flex-wrap: wrap;
  
  gap: 25px;

`;
export const CardContainer = styled.div`
  width: 202px;
  height: 370px;
  display: flex;
  flex-direction: column;
  background-color: #601860;
  border:2px solid #601860;
  border-radius: 2%;
  position: relative;
  overflow: hidden;
  transition: 0.4s;


  color: white;

  .card-price {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }

 :hover{
  transform: scale(1.1);
  background-color: #ad7dd1;
  border: #ad7dd1;
  color: #282d32;
  font-weight: bold;
 }

`;

export const CardBody = styled.div`
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

export const ImgContainer = styled.div`
  display: flex;
  place-content: center;

  img {
    width: 200px;
    border-radius: 5px;
  }
`;

export const MaisProcurados = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-color: #282d32;
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

