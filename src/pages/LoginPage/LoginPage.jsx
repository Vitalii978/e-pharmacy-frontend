import React from 'react';
import Logo from '../../components/Login/Logo/Logo';
import Title from '../../components/Login/Title/Title';
import LoginForm from '../../components/Login/LoginForm/LoginForm';
import Container from '../../components/Common/Container';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <Container>
      <div className="login-container">
        <Logo />
        <div className="login-content">
          <Title />
          <LoginForm />
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
