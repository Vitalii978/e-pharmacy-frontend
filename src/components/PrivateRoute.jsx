import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
};

// Как работает:

// Компонент получает пропсы: component (что показывать) и redirectTo (куда перенаправить)

// Проверяет через useAuth: залогинен ли пользователь?

// Если нет - отправляет на логин

// Если да - показывает запрошенную страницу
