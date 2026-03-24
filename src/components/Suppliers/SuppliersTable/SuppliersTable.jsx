// ============================================
// SuppliersTable.jsx - ТАБЛИЦА ПОСТАВЩИКОВ
// ============================================

import React, { useState } from 'react';
import { useSuppliers } from '../../../hooks/useSuppliers';
import SuppliersItem from './SuppliersItem/SuppliersItem';
import './SuppliersTable.css';

const SuppliersTable = () => {
  // 1. ПОЛУЧАЕМ МАССИВ ПОСТАВЩИКОВ ИЗ REDUX
  //    useSuppliers() - это кастомный хук, который возвращает { suppliers, isLoading, isError }
  const { suppliers } = useSuppliers();

  // 2. СОЗДАЕМ СОСТОЯНИЕ ДЛЯ ПАГИНАЦИИ
  //    currentPage - номер текущей страницы (начинается с 1)
  //    setCurrentPage - функция для изменения номера страницы
  const [currentPage, setCurrentPage] = useState(1);

  // 3. КОЛИЧЕСТВО ПОСТАВЩИКОВ НА ОДНОЙ СТРАНИЦЕ
  const itemsPerPage = 5;

  // 4. ВЫЧИСЛЯЕМ ДАННЫЕ ДЛЯ ПАГИНАЦИИ

  //    totalPages - общее количество страниц
  //    Math.ceil - округление вверх (например, 8.3 → 9 страниц)
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);

  //    startIndex - индекс первого поставщика на текущей странице
  //    Пример: страница 3, itemsPerPage=5 → startIndex = (3-1)*5 = 10
  const startIndex = (currentPage - 1) * itemsPerPage;

  //    endIndex - индекс последнего поставщика (не включая)
  const endIndex = startIndex + itemsPerPage;

  //    currentSuppliers - вырезаем нужную часть массива
  //    slice(start, end) - возвращает новый массив с элементами от start до end (end не включается)
  const currentSuppliers = suppliers?.slice(startIndex, endIndex);

  // 5. ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ СТРАНИЦЫ
  const handlePageChange = newPage => {
    setCurrentPage(newPage); // обновляем номер страницы
  };

  // 6. ЕСЛИ ПОСТАВЩИКОВ НЕТ - ПОКАЗЫВАЕМ СООБЩЕНИЕ
  if (!suppliers || suppliers.length === 0) {
    return (
      <div className="suppliers-table-container">
        <table className="suppliers-table">
          <caption className="suppliers-caption">All suppliers</caption>
          <thead>
            <tr>
              <th className="suppliers-head">Suppliers Info</th>
              <th className="suppliers-head">Address</th>
              <th className="suppliers-head">Company</th>
              <th className="suppliers-head">Delivery Date</th>
              <th className="suppliers-head">Amount</th>
              <th className="suppliers-head">Status</th>
              <th className="suppliers-head">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7">No suppliers found</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // ============================================
  // JSX - ТАБЛИЦА С ДАННЫМИ
  // ============================================
  return (
    <div className="suppliers-table-container">
      <table className="suppliers-table">
        <caption className="suppliers-caption">All suppliers</caption>

        <thead>
          <tr>
            <th className="suppliers-head">Suppliers Info</th>
            <th className="suppliers-head">Address</th>
            <th className="suppliers-head">Company</th>
            <th className="suppliers-head">Delivery Date</th>
            <th className="suppliers-head">Amount</th>
            <th className="suppliers-head">Status</th>
            <th className="suppliers-head">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* map - проходим по массиву currentSuppliers и для каждого создаем <SuppliersItem> */}
          {/* key - уникальный идентификатор для React (нужен для оптимизации) */}
          {currentSuppliers.map(supplier => (
            <SuppliersItem key={supplier._id} supplier={supplier} />
          ))}
        </tbody>
      </table>

      {/* ПАГИНАЦИЯ - показываем только если страниц больше 1 */}
      {totalPages > 1 && (
        <div className="pagination">
          {/* Array.from({ length: totalPages }) - создаем массив нужной длины */}
          {/* (_, i) - первый аргумент не нужен, используем только i (индекс) */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i} // уникальный ключ
              className={currentPage === i + 1 ? 'active' : ''} // активная страница
              onClick={() => handlePageChange(i + 1)} // при клике переключаем страницу
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SuppliersTable;
