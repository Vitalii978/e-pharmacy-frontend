import React from 'react'; // Импорт React
import { Link } from 'react-router-dom'; // Link для навигации
import './LogoHeader.css'; // Импорт стилей

// Импорт изображений логотипа для разных разрешений
import logo from '../../../assets/images/logo/logo.webp'; // Обычная версия (1x)
import logo2x from '../../../assets/images/logo/logo-2x.webp'; // Для Retina (2x)
import logo3x from '../../../assets/images/logo/logo-3x.webp'; // Для Super Retina (3x)

const LogoHeader = () => {
  // Компонент логотипа в шапке
  return (
    <Link to="/dashboard" className="logo-header-link">
      {' '}
      // При клике переходим на Dashboard
      <picture>
        {' '}
        // Для выбора правильной картинки
        <source
          srcSet={`${logo} 1x, ${logo2x} 2x, ${logo3x} 3x`} // Версии для разной плотности
          type="image/webp" // Тип WebP
        />
        <img
          src={logo} // Обычная версия
          alt="Logo" // Альтернативный текст
          className="logo-header-image" // Класс для стилей
        />
      </picture>
    </Link>
  );
};

export default LogoHeader; // Экспорт компонента
