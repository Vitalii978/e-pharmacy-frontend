import React from 'react'; // Импорт React
import { useDispatch } from 'react-redux'; // Хук для отправки действий в Redux
import { logOut } from '../../../redux/auth/operations'; // Операция выхода
import sprite from '../../../assets/sprite.svg'; // Импорт спрайта
import './LogoutBtn.css'; // Импорт стилей

const LogoutBtn = () => {
  // Компонент кнопки выхода

  const dispatch = useDispatch(); // Получаем функцию dispatch

  const onLogout = () => {
    // Функция при клике
    dispatch(logOut()); // Отправляем действие выхода в Redux
  };

  return (
    <button
      type="button" // Кнопка не отправляет форму
      className="logout-btn" // Класс для стилей
      onClick={onLogout} // При клике вызываем onLogout
    >
      <svg width={16} height={16}>
        {' '}
        // Иконка выхода
        <use xlinkHref={`${sprite}#icon-logout`} /> // Из спрайта
      </svg>
    </button>
  );
};

export default LogoutBtn; // Экспорт компонента
