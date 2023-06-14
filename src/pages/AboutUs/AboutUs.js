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
  min-height: 100vh;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0;

  h3 {
    background-color: #282d32;
    margin: 0 0 20px 0;
    color: white;
    padding: 10px;
    border-radius: 13px;
    box-shadow:0px 0px 20px 5px #601860;
  }
  `;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-color: #282d32;
  max-width: 60%;
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

export const UsersContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-flow: row wrap;
`;

export const UserCard = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 350px;
    gap: 20px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #601860;
    border-radius: 15px;
    background-color: #601860;
    transition: 0.4s;
    color: white;


    img {
        width: 100px; 
        height: 100px;
        border-radius: 50px;
        border: 3px solid #ad7dd1;
        transition: 0.7s;

    }

    h5 {
        text-align: center;
        margin: 0 0 0 20px;
    }

    :hover{
      transform: scale(1.06);
      background-color: #ad7dd1;
      border: #ad7dd1;
      color: #282d32;
      font-weight: bold;

      img{
        border: 1px solid #601860;
        box-shadow: 7px 8px 14px 3px #601860;
      }
    }

`;