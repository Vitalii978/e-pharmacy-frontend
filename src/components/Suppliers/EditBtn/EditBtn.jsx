// ============================================
// EditBtn.jsx - КНОПКА РЕДАКТИРОВАНИЯ
// ============================================

import React from 'react';
import sprite from '../../../assets/sprite.svg';
import './EditBtn.css';

// КОМПОНЕНТ EditBtn
// Принимает setOpenEditModal - функцию для открытия формы редактирования
const EditBtn = ({ setOpenEditModal }) => {
  // ============================================
  // JSX - КНОПКА
  // ============================================
  return (
    <button
      type="button" // type="button" - чтобы не отправлял форму
      className="edit-supplier-btn" // класс для CSS
      onClick={() => setOpenEditModal(true)} // при клике открываем форму редактирования
    >
      {/* SVG - иконка карандаша из спрайта */}
      <svg width={14} height={14}>
        <use xlinkHref={`${sprite}#icon-edit`} />
      </svg>
      Edit
    </button>
  );
};

export default EditBtn;
