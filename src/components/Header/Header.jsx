// ИМПОРТЫ
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { logOut } from '../../redux/auth/operations';
import sprite from '../../assets/sprite.svg';
import './Header.css';

// КОМПОНЕНТ
const Header = () => {
  // Получаем функцию dispatch для отправки действий
  const dispatch = useDispatch();
  // Получаем данные пользователя из хука useAuth
  const { user } = useAuth();

  // Функция для выхода из системы
  const handleLogout = () => {
    dispatch(logOut());
  };

  // JSX - ЧТО ПОКАЗЫВАЕМ
  return (
    <header className="header">
      {/* Левая часть шапки (пустая, потом добавим бургер и лого) */}
      <div className="header-left">
        {/* Здесь будет BurgerBtn и LogoHeader позже */}
      </div>

      {/* Центральная часть с заголовком (потом добавим HeaderTitle) */}
      <div className="header-center">
        <h1>Medicine Store</h1>
        <p>Dashboard | {user?.email}</p>
      </div>

      {/* Правая часть с кнопкой выхода */}
      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          <svg width={16} height={16}>
            <use xlinkHref={`${sprite}#icon-logout`} />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
