// ============================================
// EditProductForm.jsx - ФОРМА РЕДАКТИРОВАНИЯ ПРОДУКТА
// ============================================

// 1. ИМПОРТЫ
//    React и хуки для состояния и эффектов
import React, { useState, useEffect } from 'react';

//    Хуки react-hook-form для работы с формой
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//    useDispatch для отправки действий в Redux
import { useDispatch } from 'react-redux';

//    toast для уведомлений
import { toast } from 'react-toastify';

//    Схема валидации из файла schemas.js
import { editProductSchema } from '../../../schemas/shemas';

//    Операция редактирования продукта
import { editProduct } from '../../../redux/products/operations';

//    Компонент модального окна (общий для всего проекта)
import Modal from '../../Common/Modal/Modal';

//    Компонент кнопок Save/Cancel (общий)
import ButtonsModal from '../../Common/ButtonsModal/ButtonsModal';

//    Компоненты для выбора категории и поставщика
import CategorySelect from '../AddProductForm/CategorySelect/CategorySelect.jsx';
import SuppliersSelect from '../AddProductForm/SuppliersSelect/SuppliersSelect';

//    Импортируем CSS (обычный, не styled)
import './EditProductForm.css';

// ============================================
// 2. КОМПОНЕНТ
// ============================================

//    Пропсы, которые приходят из ProductItem:
//    setIsEdit     - функция для закрытия формы
//    product       - объект с данными продукта для редактирования
//    setIsSubmitting - функция для отслеживания процесса отправки
const EditProductForm = ({ setIsEdit, product, setIsSubmitting }) => {
  // ============================================
  // 3. СОСТОЯНИЯ КОМПОНЕНТА
  // ============================================

  // 3.1 Состояние для выбранной категории
  //     Начинается с текущей категории продукта
  const [categoryValue, setCategoryValue] = useState(product.category);

  // 3.2 Состояние для выбранного поставщика
  //     Начинается с текущего поставщика продукта
  const [suppliersValue, setSuppliersValue] = useState(product.suppliers);

  // 3.3 Получаем функцию dispatch из Redux
  const dispatch = useDispatch();

  // ============================================
  // 4. НАСТРОЙКА REACT-HOOK-FORM
  // ============================================

  // 4.1 useForm - главный хук для работы с формой
  //     register      - функция для регистрации полей ввода
  //     handleSubmit  - функция для обработки отправки
  //     setValue      - функция для программного изменения значения
  //     formState.errors - объект с ошибками валидации
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProductSchema), // подключаем валидацию
  });

  // ============================================
  // 5. EFFECT - СИНХРОНИЗАЦИЯ СОСТОЯНИЙ С ФОРМОЙ
  // ============================================

  // 5.1 Когда пользователь выбирает категорию в выпадающем списке,
  //     categoryValue меняется, и мы обновляем скрытое поле в форме
  useEffect(() => {
    if (categoryValue) {
      setValue('category', categoryValue);
    }
  }, [categoryValue, setValue]);

  // 5.2 То же самое для поставщика
  useEffect(() => {
    if (suppliersValue) {
      setValue('suppliers', suppliersValue);
    }
  }, [suppliersValue, setValue]);

  // ============================================
  // 6. ФУНКЦИЯ ОТПРАВКИ ФОРМЫ
  // ============================================

  // 6.1 Вызывается при успешной валидации формы
  const onSubmit = async data => {
    // 6.2 Включаем режим отправки (показываем лоадер в таблице)
    setIsSubmitting(true);

    // 6.3 Закрываем форму редактирования
    setIsEdit(false);

    // 6.4 Отправляем данные в Redux
    //     editProduct принимает объект { data, id }
    //     data - данные из формы
    //     id - _id продукта
    await dispatch(editProduct({ data, id: product._id }));

    // 6.5 Выключаем режим отправки
    setIsSubmitting(false);

    // 6.6 Показываем уведомление об успехе
    toast.success('Product edited successfully');
  };

  // ============================================
  // 7. JSX - ЧТО ВИДИТ ПОЛЬЗОВАТЕЛЬ
  // ============================================

  return (
    // 7.1 Modal - обертка для модального окна
    //     fn={setIsEdit} - функция для закрытия (при клике на фон или крестик)
    <Modal fn={setIsEdit}>
      {/* 7.2 Заголовок формы */}
      <h2 className="edit-form-title">Edit product</h2>

      {/* 7.3 Форма - при отправке вызывает handleSubmit(onSubmit) */}
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        {/* 7.4 ПЕРВАЯ СТРОКА: название и категория */}
        <div className="edit-form-row">
          {/* 7.4.1 Поле названия продукта */}
          <div className="edit-form-group">
            <input
              type="text"
              {...register('name')}
              defaultValue={product.name}
              placeholder="Product Info"
              className="edit-form-input"
            />
            {/* Показываем ошибку, если есть */}
            {errors.name && (
              <p className="edit-form-error">{errors.name.message}</p>
            )}
          </div>

          {/* 7.4.2 Выбор категории */}
          <div className="edit-form-group">
            <CategorySelect
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
            />
            {/* Показываем ошибку, если есть */}
            {errors.category && (
              <p className="edit-form-error">{errors.category.message}</p>
            )}
            {/* Невидимое поле для хранения значения категории в форме */}
            <input
              type="text"
              {...register('category')}
              defaultValue={product.category}
              className="edit-form-hidden"
            />
          </div>
        </div>

        {/* 7.5 ВТОРАЯ СТРОКА: поставщики и количество */}
        <div className="edit-form-row">
          {/* 7.5.1 Выбор поставщика */}
          <div className="edit-form-group">
            <SuppliersSelect
              suppliersValue={suppliersValue}
              setSuppliersValue={setSuppliersValue}
            />
            {/* Показываем ошибку, если есть */}
            {errors.suppliers && (
              <p className="edit-form-error">{errors.suppliers.message}</p>
            )}
            {/* Невидимое поле для хранения значения поставщика в форме */}
            <input
              type="text"
              {...register('suppliers')}
              defaultValue={product.suppliers}
              className="edit-form-hidden"
            />
          </div>

          {/* 7.5.2 Поле количества на складе */}
          <div className="edit-form-group">
            <input
              type="text"
              {...register('stock')}
              defaultValue={product.stock}
              placeholder="Stock"
              className="edit-form-input"
            />
            {errors.stock && (
              <p className="edit-form-error">{errors.stock.message}</p>
            )}
          </div>
        </div>

        {/* 7.6 ТРЕТЬЯ СТРОКА: цена (на всю ширину) */}
        <div className="edit-form-group">
          <input
            type="text"
            {...register('price')}
            defaultValue={product.price}
            placeholder="Price"
            className="edit-form-input"
          />
          {errors.price && (
            <p className="edit-form-error">{errors.price.message}</p>
          )}
        </div>

        {/* 7.7 КНОПКИ Save и Cancel */}
        <ButtonsModal title="Save" cancelAction={setIsEdit} />
      </form>
    </Modal>
  );
};

// ============================================
// 8. ЭКСПОРТ КОМПОНЕНТА
// ============================================
export default EditProductForm;
