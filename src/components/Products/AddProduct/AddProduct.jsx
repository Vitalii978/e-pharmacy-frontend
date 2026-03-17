// ============================================
// AddProduct.jsx - КНОПКА ДОБАВЛЕНИЯ ПРОДУКТА
// ============================================

import React, { useState } from 'react';
import sprite from '../../../assets/sprite.svg';
import AddProductForm from '../AddProductForm/AddProductForm';
import './AddProduct.css';

const AddProduct = ({ setIsModalOpen }) => {
  // Состояние для показа формы
  const [showForm, setShowForm] = useState(false);

  // Функция открытия формы
  const handleOpenForm = () => {
    setShowForm(true);
    setIsModalOpen(true); // для синхронизации с родителем
  };

  // Функция закрытия формы
  const handleCloseForm = () => {
    setShowForm(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Кнопка "Add a new product" */}
      <button className="add-product-btn" onClick={handleOpenForm}>
        <svg width={20} height={20}>
          <use xlinkHref={`${sprite}#icon-close`} />
        </svg>
        <span>Add a new product</span>
      </button>

      {/* Форма добавления (показывается только когда showForm = true) */}
      {showForm && <AddProductForm setShowModal={handleCloseForm} />}
    </>
  );
};

export default AddProduct;
