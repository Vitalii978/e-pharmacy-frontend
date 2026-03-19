// ============================================
// AddProduct.jsx - КНОПКА ДОБАВЛЕНИЯ ПРОДУКТА
// ============================================

import React, { useState } from 'react';
import sprite from '../../../assets/sprite.svg';
import AddProductForm from '../AddProductForm/AddProductForm';
import './AddProduct.css';

const AddProduct = ({ setIsModalOpen }) => {
  // setIsModalOpen - функция из родительского компонента (ProductsPage)
  // Нужна, чтобы родитель знал, открыта модалка или нет
  // Это для синхронизации состояния между компонентами

  // 3.1 Создаем состояние для показа/скрытия формы
  //     showForm - текущее состояние (true - форма открыта, false - закрыта)
  //     setShowForm - функция для изменения этого состояния
  //     Начальное значение false - форма закрыта
  const [showForm, setShowForm] = useState(false);

  // ============================================
  // 4. ФУНКЦИИ ДЛЯ ОТКРЫТИЯ/ЗАКРЫТИЯ
  // ============================================

  // 4.1 Функция открытия формы
  //    Вызывается при клике на кнопку
  const handleOpenForm = () => {
    setShowForm(true); // открываем форму (меняем локальное состояние)
    setIsModalOpen(true); // сообщаем родителю, что модалка открыта
  };

  // 4.2 Функция закрытия формы
  //    Будет передана в AddProductForm, чтобы форма могла закрыть себя
  const handleCloseForm = () => {
    setShowForm(false); // закрываем форму
    setIsModalOpen(false); // сообщаем родителю, что модалка закрыта
  };

  // ============================================
  // 5. JSX - ВЕРСТКА КОМПОНЕНТА
  // ============================================

  return (
    <>
      {/* 5.1 КНОПКА "Add a new product" */}
      <button
        className="add-product-btn" // класс для CSS стилей
        onClick={handleOpenForm} // при клике вызываем открытие
        type="button" // type="button" чтобы не отправлять форму
      >
        {/* 5.2 Иконка (крестик, повернутый на 45°) */}
        <svg width={20} height={20}>
          <use xlinkHref={`${sprite}#icon-close`} />
        </svg>

        {/* 5.3 Текст кнопки */}
        <span>Add a new product</span>
      </button>

      {/* 5.4 УСЛОВНЫЙ РЕНДЕРИНГ ФОРМЫ */}
      {/*    Если showForm = true, показываем AddProductForm */}
      {/*    Если showForm = false, не показываем ничего */}
      {showForm && <AddProductForm setShowModal={handleCloseForm} />}
    </>
  );
};

// ============================================
// 6. ЭКСПОРТ КОМПОНЕНТА
// ============================================
export default AddProduct;
