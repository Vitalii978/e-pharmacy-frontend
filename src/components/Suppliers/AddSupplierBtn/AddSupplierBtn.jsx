// ============================================
// AddSupplierBtn.jsx - КНОПКА "ADD A NEW SUPPLIERS"
// ============================================

import React from 'react';
import './AddSupplierBtn.css';

// КОМПОНЕНТ AddSupplierBtn
// Принимает пропс setIsModalOpen - функцию, которая открывает модалку
const AddSupplierBtn = ({ setIsModalOpen }) => {
  // ============================================
  // JSX - что увидит пользователь
  // ============================================
  return (
    <button
      type="button" // type="button" - чтобы кнопка НЕ отправляла форму (если она внутри формы)
      className="add-supplier-btn" // класс для CSS стилей
      onClick={() => setIsModalOpen(true)} // при клике вызываем setIsModalOpen(true) - открываем модалку
    >
      Add a new suppliers
    </button>
  );
};

export default AddSupplierBtn;
