import React from 'react';
// import { ToastContainer } from 'react-toastify';
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
      {/* ToastContainer для уведомлений на странице логина */}
      {/* <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
    </Container>
  );
};

export default LoginPage;
