// ============================================
// AddProductForm.jsx - ФОРМА ДОБАВЛЕНИЯ НОВОГО ПРОДУКТА
// ============================================

// 1.1 React и хуки
import React, { useState, useEffect } from 'react';

// 1.2 Хуки react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// 1.3 Redux
import { useDispatch } from 'react-redux';

// 1.4 Уведомления
// import { toast } from 'react-toastify';

// 1.5 Схема валидации
import { addProductSchema } from '../../../schemas/shemas';

// 1.6 Операция добавления продукта
import { addProduct } from '../../../redux/products/operations';

// 1.7 Общие компоненты
import Modal from '../../Common/Modal/Modal';
import ButtonsModal from '../../Common/ButtonsModal/ButtonsModal';

// 1.8 Специфические компоненты для этой формы
import CategorySelect from './CategorySelect/CategorySelect';
import SuppliersSelect from './SuppliersSelect/SuppliersSelect';

// 1.9 CSS
import './AddProductForm.css';

// ============================================
// 2. ПРОПСЫ КОМПОНЕНТА
// ============================================

const AddProductForm = ({ setShowModal }) => {
  // setShowModal - функция для закрытия модалки (из ProductsPage)

  <AddProductForm setShowModal={setShowModal} />;

  // ============================================
  // 3. СОСТОЯНИЯ КОМПОНЕНТА
  // ============================================

  // 3.1 Состояние для выбранной категории
  const [categoryValue, setCategoryValue] = useState(null);

  // 3.2 Состояние для выбранного поставщика
  const [suppliersValue, setSuppliersValue] = useState(null);

  // 3.3 dispatch для Redux
  const dispatch = useDispatch();

  // ============================================
  // 4. НАСТРОЙКА REACT-HOOK-FORM
  // ============================================

  const {
    register, // для регистрации полей
    handleSubmit, // для обработки отправки
    setValue, // для установки значений
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
  });

  // ============================================
  // 5. EFFECT - ОБНОВЛЕНИЕ ЗНАЧЕНИЙ В ФОРМЕ
  // ============================================

  // 5.1 Когда выбирают категорию
  useEffect(() => {
    if (categoryValue) {
      setValue('category', categoryValue);
    }
  }, [categoryValue, setValue]);

  // 5.2 Когда выбирают поставщика
  useEffect(() => {
    if (suppliersValue) {
      setValue('suppliers', suppliersValue);
    }
  }, [suppliersValue, setValue]);

  // ============================================
  // 6. ФУНКЦИЯ ОТПРАВКИ ФОРМЫ
  // ============================================

  const onSubmit = data => {
    // 6.1 Отправляем данные в Redux
    dispatch(addProduct(data));

    // 6.2 Закрываем модалку
    setShowModal(false);

    // // 6.3 Показываем уведомление
    // toast.success('Product added successfully');
  };

  // ============================================
  // 7. JSX - ВЕРСТКА ФОРМЫ
  // ============================================

  return (
    // 7.1 Модальное окно
    <Modal fn={setShowModal}>
      {/* 7.2 Заголовок */}
      <h2 className="add-form-title">Add a new product</h2>

      {/* 7.3 Форма */}
      <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
        {/* 7.4 ПЕРВАЯ СТРОКА: название и категория */}
        <div className="add-form-row">
          {/* 7.4.1 Название продукта */}
          <div className="add-form-group">
            <input
              type="text"
              {...register('name')}
              placeholder="Product Info"
              className="add-form-input"
            />
            {errors.name && (
              <p className="add-form-error">{errors.name.message}</p>
            )}
          </div>

          {/* 7.4.2 Категория */}
          <div className="add-form-group">
            <CategorySelect
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
            />
            {errors.category && (
              <p className="add-form-error">{errors.category.message}</p>
            )}
            {/* Скрытое поле для хранения значения */}
            <input
              type="text"
              {...register('category')}
              className="add-form-hidden"
            />
          </div>
        </div>

        {/* 7.5 ВТОРАЯ СТРОКА: поставщики и количество */}
        <div className="add-form-row">
          {/* 7.5.1 Поставщики */}
          <div className="add-form-group">
            <SuppliersSelect
              suppliersValue={suppliersValue}
              setSuppliersValue={setSuppliersValue}
            />
            {errors.suppliers && (
              <p className="add-form-error">{errors.suppliers.message}</p>
            )}
            <input
              type="text"
              {...register('suppliers')}
              className="add-form-hidden"
            />
          </div>

          {/* 7.5.2 Количество на складе */}
          <div className="add-form-group">
            <input
              type="text"
              {...register('stock')}
              placeholder="Stock"
              className="add-form-input"
            />
            {errors.stock && (
              <p className="add-form-error">{errors.stock.message}</p>
            )}
          </div>
        </div>

        {/* 7.6 ЦЕНА (на всю ширину) */}
        <div className="add-form-group">
          <input
            type="text"
            {...register('price')}
            placeholder="Price"
            className="add-form-input"
          />
          {errors.price && (
            <p className="add-form-error">{errors.price.message}</p>
          )}
        </div>

        {/* 7.7 КНОПКИ Add / Cancel */}
        <ButtonsModal title="Add" cancelAction={setShowModal} />
      </form>
    </Modal>
  );
};

// ============================================
// 8. ЭКСПОРТ
// ============================================
export default AddProductForm;
