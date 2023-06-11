import { useState } from "react";
import { Button, FormContainer, LoginFormWrapper, Label, Input } from "./style";
import { Link } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   async function fetchCategorias() {
  //     Api.get("/categorias")
  //       .then((result) => {
  //         setCategorias(result.data);
  //       })
  //       .catch((error) => {
  //         console.log(error.response);
  //       });
  //   }
  //   fetchCategorias();
  // }, []);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação aqui (por exemplo, chamada a uma API)
    console.log("Email:", email);
    console.log("Password:", password);
    // Limpar os campos após a submissão
    setEmail("");
    setPassword("");
  };

  return (
    <FormContainer>
      <LoginFormWrapper onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Label>
          Usuário:
          <Input type="text" value={userName} onChange={handleUserNameChange} />
        </Label>
        <Label>
          Senha:
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Label>
        <Button type="submit">Login</Button>
        <Link to={"/signup"}>Criar Nova Conta</Link>
      </LoginFormWrapper>
    </FormContainer>
  );
}

export default Login;
