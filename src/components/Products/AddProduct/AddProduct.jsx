// ============================================
// AddProduct.jsx - КНОПКА ДОБАВЛЕНИЯ ПРОДУКТА
// ============================================

import React from 'react';
import sprite from '../../../assets/sprite.svg';
import './AddProduct.css';

const AddProduct = ({ setIsModalOpen }) => {
  return (
    <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
      <svg width={20} height={20}>
        <use xlinkHref={`${sprite}#icon-close`} />
      </svg>
      <span>Add a new product</span>
    </button>
  );
};

export default AddProduct;
