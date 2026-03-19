// ============================================
// HeaderTitle.jsx - ЗАГОЛОВОК В ШАПКЕ
// ============================================

import React from 'react';

//    useLocation - хук из react-router-dom для получения текущего URL
//    Нужен, чтобы определить, на какой странице мы находимся
import { useLocation } from 'react-router-dom';

//    useAuth - наш кастомный хук для получения данных пользователя
//    Нужен, чтобы показать email в шапке
import { useAuth } from '../../../hooks/useAuth';
import './HeaderTitle.css';

const HeaderTitle = () => {
  // 3. Получаем текущий путь (например, "/dashboard", "/orders")
  const location = useLocation();

  // 4. Получаем данные пользователя из Redux через хук
  const { user } = useAuth();

  // 5. Определяем название страницы по текущему пути
  //    Переменная title будет показывать, где мы находимся
  let title;

  //    switch - проверяем разные варианты пути
  switch (location.pathname) {
    case '/dashboard':
      title = 'Dashboard'; // если мы на /dashboard
      break;
    case '/orders':
      title = 'All orders'; // если мы на /orders
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
      {/* Название магазина - всегда одинаковое */}
      <h1>Medicine store</h1>

      {/* Название страницы и email пользователя */}
      {/* user?.email - если user есть, показываем email, если нет - ничего */}
      <p>
        {title} | {user.email}
      </p>
    </div>
  );
};

export default HeaderTitle;
