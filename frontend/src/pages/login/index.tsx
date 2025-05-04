import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 10px;
  flex-direction: column;
  max-width: 500px;
  padding: 40px 0;
  max-height: 500px;
  height: 100%;
  box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
  width: 100%;
  h2 {
    color: white;
  }
`;

const ContainerForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 10px;
`;

const ContainerInput = styled.div`
  input {
    margin-top: 20px;
    width: 100%;
    border: none;
    background: transparent;
    box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
    padding: 15px 15px;
    font-size: 15px;
    border-radius: 14px;
    color: white;
  }
`;
const ContainerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  button {
    width: 80%;
    margin-top: 40px;
    padding: 13px 5px;
    border-radius: 14px;
    cursor: pointer;
    border: none;
    background: transparent;
    box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
    color: white;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  p {
    color: white;
    border-bottom: 1px solid white;
  }
`;

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <Container>
      <LoginBox>
        <h2>Login</h2>
        <ContainerForm onSubmit={handleLogin}>
          <ContainerInput>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
          </ContainerInput>
          <ContainerFooter>
            <button type="submit">Entrar</button>
            <Link to={`/register`}>
              <p>Ainda não tem conta? click aqui.</p>
            </Link>
          </ContainerFooter>
        </ContainerForm>
      </LoginBox>
    </Container>
  );
}
