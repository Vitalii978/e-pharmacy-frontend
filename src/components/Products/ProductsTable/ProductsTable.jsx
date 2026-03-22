// ============================================
// ProductsTable.jsx - ТАБЛИЦА ПРОДУКТОВ
// ============================================

// 1. ИМПОРТЫ
//    React - нужен для создания компонента
//    useState - для хранения текущей страницы пагинации
//    useEffect - для корректировки страницы, если на ней нет продуктов
import React, { useState, useEffect } from 'react';

// 2. useProducts - кастомный хук, который достает продукты из Redux
//    Откуда берется: из файла src/hooks/useProducts.js
//    Что делает: вызывает useSelector и возвращает { products, productsLoading, ... }
import { useProducts } from '../../../hooks/useProducts';

// 3. ProductItem - компонент одной строки таблицы
//    Отвечает за отображение одного продукта и кнопок редактирования/удаления
import ProductItem from '../ProductItem/ProductItem';

// 4. Стили для этой таблицы
import './ProductsTable.css';

// ============================================
// КОМПОНЕНТ ProductsTable
// ============================================
const ProductsTable = () => {
  // 5. ПОЛУЧАЕМ ПРОДУКТЫ ИЗ REDUX
  //    useProducts() возвращает объект, из которого мы берем products
  //    products приходит из store через useSelector
  const { products } = useProducts();

  // 6. ПРЕОБРАЗУЕМ ДАННЫЕ В ПРАВИЛЬНЫЙ ФОРМАТ
  //    ПРОБЛЕМА: сервер возвращает массив объектов вида { product: {...} }
  //    НАМ НУЖНО: просто массив продуктов {...}
  //
  //    Как это работает:
  //    - Array.isArray(products) - проверяем, что products - это массив
  //    - products.map(item => item.product || item) - для каждого элемента:
  //        * если у элемента есть поле product - берем его (item.product)
  //        * если нет - берем сам элемент (item)
  //    - .filter(p => p) - убираем пустые значения (null, undefined)
  const actualProducts = Array.isArray(products)
    ? products.map(item => item.product || item).filter(p => p)
    : [];

  // 7. СОСТОЯНИЕ ДЛЯ ПАГИНАЦИИ
  //    currentPage - номер текущей страницы (начинается с 1)
  //    setCurrentPage - функция для изменения страницы
  const [currentPage, setCurrentPage] = useState(1);

  // 8. КОЛИЧЕСТВО ПРОДУКТОВ НА ОДНОЙ СТРАНИЦЕ
  //    По ТЗ - 5 продуктов на странице
  const itemsPerPage = 5;

  // 9. ВЫЧИСЛЯЕМ ОБЩЕЕ КОЛИЧЕСТВО СТРАНИЦ
  //    Math.ceil - округление вверх (если 13 продуктов, то 3 страницы)
  //    actualProducts.length / itemsPerPage = количество страниц
  const totalPages = Math.ceil(actualProducts.length / itemsPerPage);

  // 10. ВЫЧИСЛЯЕМ, КАКИЕ ПРОДУКТЫ ПОКАЗАТЬ НА ТЕКУЩЕЙ СТРАНИЦЕ
  //     startIndex = (текущая страница - 1) * количество на странице
  //     Пример: страница 1 → startIndex = 0
  //             страница 2 → startIndex = 5
  //             страница 3 → startIndex = 10
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 11. slice(startIndex, endIndex) - вырезает часть массива
  //     берет элементы с startIndex по endIndex (не включая endIndex)
  const currentProducts = actualProducts.slice(startIndex, endIndex);

  // 12. ЭФФЕКТ ДЛЯ КОРРЕКТИРОВКИ СТРАНИЦЫ
  //     Если на текущей странице нет продуктов (например, удалили последний продукт)
  //     и мы не на первой странице - переходим на предыдущую страницу
  //     Зависимости: currentPage и currentProducts (срабатывает при их изменении)
  useEffect(() => {
    if (currentProducts?.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, currentProducts]);

  // 13. ЕСЛИ ПРОДУКТОВ НЕТ - ПОКАЗЫВАЕМ ЗАГЛУШКУ
  //     Проверяем actualProducts (преобразованные данные), а не products
  if (!actualProducts || actualProducts.length === 0) {
    return (
      <div className="products-table-container">
        <table className="products-table">
          {/* caption - заголовок таблицы (визуально) */}
          <caption className="table-caption">All products</caption>
          <thead>
            <tr>
              <th className="table-header">Product Info</th>
              <th className="table-header">Category</th>
              <th className="table-header">Stock</th>
              <th className="table-header">Suppliers</th>
              <th className="table-header">Price</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* colSpan="6" - объединяем 6 ячеек в одну */}
              <td colSpan="6" className="no-data">
                No products found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // 14. ОСНОВНОЙ РЕНДЕР - КОГДА ПРОДУКТЫ ЕСТЬ
  return (
    <div className="products-table-container">
      <table className="products-table">
        <caption className="table-caption">All products</caption>
        <thead>
          <tr>
            <th className="table-header">Product Info</th>
            <th className="table-header">Category</th>
            <th className="table-header">Stock</th>
            <th className="table-header">Suppliers</th>
            <th className="table-header">Price</th>
            <th className="table-header">Action</th>
          </tr>
        </thead>

        {/* ТЕЛО ТАБЛИЦЫ - ПРОХОДИМ ПО ТЕКУЩИМ ПРОДУКТАМ */}
        <tbody>
          {currentProducts.map(product => (
            // 15. ProductItem - компонент одной строки
            //     key={product._id} - уникальный идентификатор для React
            //     product={product} - передаем данные продукта
            <ProductItem key={product._id} product={product} />
          ))}
        </tbody>
      </table>

      {/* 16. ПАГИНАЦИЯ - ПОКАЗЫВАЕМ ТОЛЬКО ЕСЛИ СТРАНИЦ БОЛЬШЕ 1 */}
      {totalPages > 1 && (
        <div className="pagination">
          {/* Array.from({ length: totalPages }) - создаем массив нужной длины */}
          {Array.from({ length: totalPages }, (_, i) => (
            // 17. КНОПКА СТРАНИЦЫ
            //     key={i} - уникальный ключ для каждой кнопки
            //     className - если кнопка активна, добавляем класс 'active'
            //     onClick - при клике переключаемся на страницу i+1
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 18. ЭКСПОРТ - чтобы компонент можно было использовать в других файлах
export default ProductsTable;
