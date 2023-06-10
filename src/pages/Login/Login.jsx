import { useState } from 'react';
import {
    Button,
    FormContainer,
    LoginFormWrapper,
    Label,
    Input
} from './style'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação aqui (por exemplo, chamada a uma API)
    console.log('Email:', email);
    console.log('Password:', password);
    // Limpar os campos após a submissão
    setEmail('');
    setPassword('');
  };

  return (
    <FormContainer>
      <LoginFormWrapper onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input type="email" value={email} onChange={handleEmailChange} />
        </Label>
        <Label>
          Senha:
          <Input type="password" value={password} onChange={handlePasswordChange} />
        </Label>
        <Button type="submit">Login</Button>
      </LoginFormWrapper>
    </FormContainer>
  );
}

export default Login;