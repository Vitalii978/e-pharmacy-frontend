import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../redux/orders/selectors';
import OrderItem from './OrderItem/OrderItem';
import './OrdersTable.css';

const OrdersTable = () => {
  const orders = useSelector(selectOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

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
          {currentOrders.map(order => (
            <OrderItem key={order._id} order={order} />
          ))}
        </tbody>
      </table>

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
