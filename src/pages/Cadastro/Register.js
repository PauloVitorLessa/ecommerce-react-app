import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  background-color: #282d32;
  align-items: center;
  justify-content: center;
  padding: 13px;
  border-radius: 13px;
  color: white;
  box-shadow:0px 0px 20px 5px #601860;

  input{
    background-color: #601860;
    border-color: #601860;
    border-radius: 13px;
    padding: 3px;
  }

  button{
    margin-top: 9px;
    background-color: #ad7dd1;
    color: #282d32;
    border-color: #ad7dd1;
    transition: 0.4s;

    :hover{
      transform: scale(1.1);
      box-shadow:0px 0px 20px 5px #601860;
      border-color: #601860;
    }
  }


`;


export const ContentContainer= styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;

  h2{
    background-color: #282d32;
    color: white;
    padding: 5px;
    border-radius: 13px;
    margin: 13px;
    box-shadow:0px 0px 20px 5px #601860;
  }
`;