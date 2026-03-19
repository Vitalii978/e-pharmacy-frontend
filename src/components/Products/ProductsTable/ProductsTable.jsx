// ============================================
// ProductsTable.jsx - ТАБЛИЦА ПРОДУКТОВ
// ============================================

import React, { useState, useEffect } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import ProductItem from '../ProductItem/ProductItem';
import './ProductsTable.css';

const ProductsTable = () => {
  // Получаем продукты из Redux
  const { products } = useProducts();

  // Состояние для текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Вычисляем продукты для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex);

  // Эффект для корректировки страницы, если текущая страница пуста
  useEffect(() => {
    // Если на текущей странице нет продуктов и это не первая страница
    if (currentProducts?.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, currentProducts]);

  // Если продуктов нет - показываем заглушку
  if (!products || products.length === 0) {
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
          <tbody>
            <tr>
              <td colSpan="6" className="no-data">
                No products found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

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
        <tbody>
          {currentProducts?.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </tbody>
      </table>

      {/* Пагинация - показываем только если страниц больше 1 */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
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

export default ProductsTable;
