import styled from "styled-components";

export const ContentContainer = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  background-color: #D6C7E4;

  h3 {
    margin: 0 0 20px 0;
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
    border: 1px solid #000;
    border-radius: 15px;
    background-color: #ad7dd1;

    img {
        width: 100px; 
        height: 100px;
        border-radius: 50px;
    }

    h5 {
        text-align: center;
        margin: 0 0 0 20px;
    }
`;