import React from 'react';
import './Logo.css';
import logoDefault from '../../../assets/images/logo-login/logo-login.webp';
import logo1x from '../../../assets/images/logo-login/logo-login-1x.webp';
import logo2x from '../../../assets/images/logo-login/logo-login-2x.webp';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      <picture>
        <source
          srcSet={`${logoDefault} 1x, ${logo1x} 2x, ${logo2x} 3x`}
          type="image/webp"
        />
        <img src={logoDefault} alt="E-Pharmacy Logo" className="logo-image" />
      </picture>
      <p className="logo-text">E-Pharmacy</p>
    </Link>
  );
};

export default Logo;
