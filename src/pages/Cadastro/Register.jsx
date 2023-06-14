import { useState } from "react";
import { Api } from '../../services/api'


import {
  FormContainer,
  ContentContainer,

} from "./Register";

export function Register() {

  //REGISTER
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, SetError] = useState("");

  const handleSignup = () => {
    if (!name | !email | !password | !confirmPassword) {
      SetError("Preencha todos os campos");
      return;
    } else if (password !== confirmPassword) {
      SetError("As senhas não são iguais");
      return;
    } else {
      alert("Usuário cadatrado com sucesso!");
    }
  };

  function CadastrarUsuario() {
    Api.post(`/cliente`);
  }

  return (
    <ContentContainer>
      <h2>Cadastro</h2>
      <FormContainer>
        <form onSubmit={handleSignup}>
          <label>
            Nome: <br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Email: <br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Senha: <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Confirmação de Senha: <br />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <br />
          <label>
            CEP: <br />
            <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
          </label>
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </FormContainer>
    </ContentContainer>
  );

}

export default Register;