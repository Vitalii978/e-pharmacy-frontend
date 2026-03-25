import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './HeaderTitle.css';

const HeaderTitle = () => {
  const location = useLocation();
  const { user } = useAuth();
  let title;

  switch (location.pathname) {
    case '/dashboard':
      title = 'Dashboard';
      break;
    case '/orders':
      title = 'All orders';
      break;
    case '/products':
      title = 'All products';
      break;
    case '/suppliers':
      title = 'All suppliers';
      break;
    case '/customers':
      title = 'All customers';
      break;
    default:
      title = 'Dashboard';
  }

  return (
    <div className="header-title">
      <h1>Medicine store</h1>
      <p>
        {title} | {user.email}
      </p>
    </div>
  );
};

export default HeaderTitle;
