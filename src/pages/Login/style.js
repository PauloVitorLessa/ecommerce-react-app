import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  h2 {
    color: white;
  }

  .errmsg {
    background-color: #282d32;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 5%;
  background: #282d32;
  border: 1px solid #282d32;
  box-shadow: 27px 16px 3px 0 #570e8c;
  color: white;

  a {
    padding-top: 15px;
    color: white;
  }
`;

export const Label = styled.label`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  background-color: #601860;
  width: 250px;
  border-color: #601860;
  border-radius: 20px;
`;

export const Button = styled.button`
  padding: 8px 16px;
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
`;
