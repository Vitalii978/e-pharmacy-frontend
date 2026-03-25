import React, { useState, useEffect } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import ProductItem from '../ProductItem/ProductItem';
import './ProductsTable.css';

const ProductsTable = () => {
  const { products } = useProducts();
  const actualProducts = Array.isArray(products)
    ? products.map(item => item.product || item).filter(p => p)
    : [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(actualProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = actualProducts.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentProducts?.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, currentProducts]);

  if (!actualProducts || actualProducts.length === 0) {
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
          {currentProducts.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </tbody>
      </table>

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

// 18. ЭКСПОРТ - чтобы компонент можно было использовать в других файлах
export default ProductsTable;
