// ============================================
// ProductItem.jsx - ОДНА СТРОКА В ТАБЛИЦЕ ПРОДУКТОВ
// ============================================

// 1. Импортируем React
import React, { useState } from 'react';

// 2. Импортируем компонент кнопок (редактировать/удалить)
import Buttons from '../Buttons/Buttons';

// 3. Импортируем форму редактирования (будет создана позже)
import EditProductForm from '../EditProductForm/EditProductForm';

// 4. Импортируем хук для получения состояния загрузки
import { useProducts } from '../../../hooks/useProducts';

// 5. Импортируем CSS
import './ProductItem.css';

// 6. КОМПОНЕНТ ProductItem
//    Принимает объект product с данными одного продукта
const ProductItem = ({ product }) => {
  // 7. Деструктурируем product - достаем нужные поля
  const { name, category, price, stock, suppliers, _id } = product;

  // 8. Состояние для открытия формы редактирования
  const [isEdit, setIsEdit] = useState(false);

  // 9. Состояние для отслеживания процесса отправки
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 10. Получаем состояние загрузки из Redux
  const { productsLoading } = useProducts();

  // 11. Определяем, показывать ли лоадер
  const isLoading = productsLoading && isSubmitting;

  // 12. JSX - одна строка таблицы
  return (
    <>
      {/* Если isEdit = true, показываем форму редактирования */}
      {isEdit && (
        <EditProductForm
          setIsEdit={setIsEdit} // функция для закрытия формы
          product={product} // данные продукта для редактирования
          setIsSubmitting={setIsSubmitting} // для отслеживания загрузки
        />
      )}

      {/* Строка таблицы */}
      <tr className="product-row">
        {/* ЯЧЕЙКА: название продукта */}
        <td className="product-cell name-cell">
          {isLoading ? <span>Загрузка...</span> : name}
        </td>

        {/* ЯЧЕЙКА: категория */}
        <td className="product-cell category-cell">
          {isLoading ? <span>Загрузка...</span> : category}
        </td>

        {/* ЯЧЕЙКА: количество на складе */}
        <td className="product-cell stock-cell">
          {isLoading ? <span>Загрузка...</span> : stock}
        </td>

        {/* ЯЧЕЙКА: поставщики */}
        <td className="product-cell suppliers-cell">
          {isLoading ? <span>Загрузка...</span> : suppliers}
        </td>

        {/* ЯЧЕЙКА: цена */}
        <td className="product-cell price-cell">
          {isLoading ? <span>Загрузка...</span> : price}
        </td>

        {/* ЯЧЕЙКА: кнопки действий */}
        <td className="product-cell actions-cell">
          <Buttons
            id={_id} // id продукта для удаления/редактирования
            setIsEdit={setIsEdit} // функция для открытия формы редактирования
            setIsSubmitting={setIsSubmitting} // для отслеживания загрузки
          />
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
