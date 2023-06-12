import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ad7dd1;
  h2 {
    color: #570e8c;
  }

  .errmsg {
    background-color: lightpink;
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
  background: #ffffff;
  border: 1px solid #ccc;
  box-shadow: 27px 16px 3px 0 #570e8c;

  a {
    padding-top: 15px;
    color: #570e8c;
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
  width: 250px;
  border: 1px solid #000;
  border-radius: 20px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
  }
`;
