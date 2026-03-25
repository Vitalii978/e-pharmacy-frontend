import React, { useState } from 'react';
import sprite from '../../../assets/sprite.svg';
import AddProductForm from '../AddProductForm/AddProductForm';
import './AddProduct.css';

const AddProduct = ({ setIsModalOpen }) => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
    setIsModalOpen(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="add-product-btn"
        onClick={handleOpenForm}
        type="button"
      >
        <svg width={20} height={20}>
          <use xlinkHref={`${sprite}#icon-close`} />
        </svg>

        <span>Add a new product</span>
      </button>

      {showForm && <AddProductForm setShowModal={handleCloseForm} />}
    </>
  );
};

export default AddProduct;
