import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../redux/products/operations';
import sprite from '../../../assets/sprite.svg';
import './Buttons.css';

const Buttons = ({ id, setIsEdit, setIsSubmitting }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setIsSubmitting(true);
    await dispatch(deleteProduct(id));
    setIsSubmitting(false);
  };

  const handleEdit = () => setIsEdit(true);

  return (
    <div className="action-buttons">
      <button type="button" className="edit-btn" onClick={handleEdit}>
        <svg width={16} height={16}>
          <use xlinkHref={`${sprite}#icon-edit`} />
        </svg>
      </button>

      <button type="button" className="delete-btn" onClick={handleDelete}>
        <svg width={16} height={16}>
          <use xlinkHref={`${sprite}#icon-trash`} />
        </svg>
      </button>
    </div>
  );
};

export default Buttons;
