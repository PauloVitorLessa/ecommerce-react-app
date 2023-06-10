import { useState } from "react";
import { Api } from '../../services/api'


import {
  
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

  function CadastrarUsuario (){
    Api.post(`/cliente`);
  }

  return (
    <form onSubmit={handleSignup}>
      <label>
        Nome:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Senha:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Confirmação de Senha:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <br />
      <label>
        CEP:
        <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
      </label>
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  );

}

export default Register;