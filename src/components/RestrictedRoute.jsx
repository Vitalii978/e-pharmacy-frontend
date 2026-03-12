import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

// Как работает:

// Используется для страницы логина

// Если пользователь уже залогинен - не пускаем его на логин, отправляем на главную

// Если не залогинен - показываем страницу логина
