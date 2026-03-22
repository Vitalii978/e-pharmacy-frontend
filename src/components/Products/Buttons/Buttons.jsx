// ============================================
// Buttons.jsx - КНОПКИ ДЕЙСТВИЙ (РЕДАКТИРОВАТЬ/УДАЛИТЬ)
// ============================================

// 1. Импорты
import React from 'react';
import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
import { deleteProduct } from '../../../redux/products/operations';
import sprite from '../../../assets/sprite.svg';
import './Buttons.css';

// 2. КОМПОНЕНТ
//    Принимает id продукта и функции для управления состоянием
const Buttons = ({ id, setIsEdit, setIsSubmitting }) => {
  const dispatch = useDispatch();

  // 3. Функция удаления продукта
  const handleDelete = async () => {
    setIsSubmitting(true); // показываем лоадер
    await dispatch(deleteProduct(id)); // отправляем запрос на удаление
    setIsSubmitting(false); // убираем лоадер
    // toast.success('Product deleted successfully'); // показываем уведомление
  };

  // 4. Функция открытия формы редактирования
  const handleEdit = () => setIsEdit(true);

  return (
    <div className="action-buttons">
      {/* Кнопка редактировать */}
      <button type="button" className="edit-btn" onClick={handleEdit}>
        <svg width={16} height={16}>
          <use xlinkHref={`${sprite}#icon-edit`} />
        </svg>
      </button>

      {/* Кнопка удалить */}
      <button type="button" className="delete-btn" onClick={handleDelete}>
        <svg width={16} height={16}>
          <use xlinkHref={`${sprite}#icon-trash`} />
        </svg>
      </button>
    </div>
  );
};

export default Buttons;
