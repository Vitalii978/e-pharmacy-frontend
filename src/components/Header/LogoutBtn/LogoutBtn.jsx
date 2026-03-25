import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/auth/operations';
import sprite from '../../../assets/sprite.svg';
import './LogoutBtn.css';

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut());
  };

  return (
    <button type="button" className="logout-btn" onClick={onLogout}>
      <svg width={16} height={16}>
        {' '}
        // Иконка выхода
        <use xlinkHref={`${sprite}#icon-logout`} /> // Из спрайта
      </svg>
    </button>
  );
};

export default LogoutBtn;
