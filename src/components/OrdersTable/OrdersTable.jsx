// ============================================
// OrdersTable.jsx - ТАБЛИЦА ЗАКАЗОВ С ПАГИНАЦИЕЙ
// ============================================

// 1. Импорты React и хуков
import React, { useState } from 'react';

// 2. Импортируем хук для получения данных из Redux
import { useSelector } from 'react-redux';
import { selectOrders } from '../../redux/orders/selectors';

// 3. Импортируем компонент одной строки
import OrderItem from './OrderItem/OrderItem';

// 4. Импортируем CSS
import './OrdersTable.css';

// 5. КОМПОНЕНТ
const OrdersTable = () => {
  // 6. Получаем заказы из Redux
  const orders = useSelector(selectOrders);

  // 7. Состояние для пагинации (какая страница сейчас)
  const [currentPage, setCurrentPage] = useState(1);

  // 8. Сколько заказов показывать на одной странице
  const itemsPerPage = 5;

  // 9. Вычисляем общее количество страниц
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // 10. Вычисляем, какие заказы показывать на текущей странице
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // 11. Функция для переключения страницы
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  // 12. Если заказов нет - показываем сообщение
  if (!orders || orders.length === 0) {
    return (
      <div className="orders-table-container">
        <table className="orders-table">
          <caption className="table-caption">All orders</caption>
          <thead>
            <tr>
              <th className="order-header">User Info</th>
              <th className="order-header">Address</th>
              <th className="order-header">Products</th>
              <th className="order-header">Order date</th>
              <th className="order-header">Price</th>
              <th className="order-header">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="no-data">
                No orders found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // 13. JSX с таблицей и пагинацией
  return (
    <div className="orders-table-container">
      {/* ТАБЛИЦА */}
      <table className="orders-table">
        {/* Заголовок таблицы (caption) */}
        <caption className="table-caption">All orders</caption>

        {/* ЗАГОЛОВКИ КОЛОНОК */}
        <thead>
          <tr>
            <th className="order-header">User Info</th>
            <th className="order-header">Address</th>
            <th className="order-header">Products</th>
            <th className="order-header">Order date</th>
            <th className="order-header">Price</th>
            <th className="order-header">Status</th>
          </tr>
        </thead>

        {/* ТЕЛО ТАБЛИЦЫ (ДАННЫЕ) */}
        <tbody>
          {currentOrders.map(order => (
            <OrderItem key={order._id} order={order} />
          ))}
        </tbody>
      </table>

      {/* ПАГИНАЦИЯ - кнопки для переключения страниц */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
