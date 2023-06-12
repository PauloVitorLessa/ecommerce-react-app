import { useState } from "react";
import { Button, FormContainer, LoginFormWrapper, Label, Input } from "./style";
import { Link } from "react-router-dom";
import { Api, ApiLocal } from "../../services/api";
import { setSession } from "../../services/sessionStorage";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginJson = {
      username: userName,
      password: password,
    };
    Api.post("/login", loginJson)
      .then((result) => {
        setSession("user", result.data);
        window.location.href = "/";
      })
      .catch((error) => {
        if (!error?.response) {
          setErrMsg("Sem Resposta do servidor.");
        } else if (error.response.status === 400) {
          setErrMsg("Senha ou usuário inválidos");
          console.log(error.response);
        } else {
          setErrMsg("Erro no servidor");
          console.log(error);
        }
      });

    setUserName("");
    setPassword("");
  };

  return (
    <FormContainer>
      <LoginFormWrapper onSubmit={handleSubmit}>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <h2>Login</h2>
        <Label>
          Usuário:
          <Input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value), setErrMsg("");
            }}
          />
        </Label>
        <Label>
          Senha:
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value), setErrMsg("");
            }}
          />
        </Label>
        <Button type="submit">Login</Button>
        <Link to={"/signup"}>Criar Nova Conta</Link>
      </LoginFormWrapper>
    </FormContainer>
  );
}

export default Login;
