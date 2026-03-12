import React from 'react'; // Импорт React
import { useLocation } from 'react-router-dom'; // Хук для определения текущего пути
import { useAuth } from '../../../hooks/useAuth'; // Хук для получения данных пользователя
import './HeaderTitle.css'; // Импорт стилей

const HeaderTitle = () => {
  // Компонент заголовка в шапке
  const location = useLocation(); // Получаем текущий путь (например, "/dashboard")
  const { user } = useAuth(); // Получаем данные пользователя из Redux

  // Определяем заголовок в зависимости от пути
  let title; // Переменная для заголовка
  switch (
    location.pathname // Проверяем текущий путь
  ) {
    case '/dashboard':
      title = 'Dashboard'; // Если путь /dashboard
      break;
    case '/orders':
      title = 'All orders'; // Если путь /orders
      break;
    case '/products':
      title = 'All products'; // Если путь /products
      break;
    case '/suppliers':
      title = 'All suppliers'; // Если путь /suppliers
      break;
    case '/customers':
      title = 'All customers'; // Если путь /customers
      break;
    default:
      title = 'Dashboard'; // По умолчанию
  }

  return (
    <div className="header-title">
      {' '}
      // Контейнер для заголовков
      <h1 className="header-main-title">Medicine store</h1> // Основной
      заголовок
      <p className="header-sub-title">
        {' '}
        // Подзаголовок с email
        {title} | {user.email} // Например: "Dashboard | admin@mail.com"
      </p>
    </div>
  );
};

export default HeaderTitle; // Экспорт компонента
