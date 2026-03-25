import React from 'react';
import './AddSupplierBtn.css';

const AddSupplierBtn = ({ setIsModalOpen }) => {
  return (
    <button
      type="button"
      className="add-supplier-btn"
      onClick={() => setIsModalOpen(true)}
    >
      Add a new suppliers
    </button>
  );
};

export default AddSupplierBtn;
