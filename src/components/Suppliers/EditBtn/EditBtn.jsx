import React from 'react';
import sprite from '../../../assets/sprite.svg';
import './EditBtn.css';

const EditBtn = ({ setOpenEditModal }) => {
  return (
    <button
      type="button"
      className="edit-supplier-btn"
      onClick={() => setOpenEditModal(true)}
    >
      <svg width={14} height={14}>
        <use xlinkHref={`${sprite}#icon-edit`} />
      </svg>
      Edit
    </button>
  );
};

export default EditBtn;
