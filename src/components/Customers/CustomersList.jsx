import React, { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import CustomerItem from './CustomerItem/CustomerItem';
import './CustomersList.css';

const CustomersList = () => {
  const { customers } = useCustomers();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentCustomers =
    customers?.length > 5 ? customers.slice(startIndex, endIndex) : customers;

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  if (!customers || customers.length === 0) {
    return (
      <div className="customers-table-container">
        <table className="customer-table">
          <caption className="table-caption">All customers</caption>
          <thead>
            <tr>
              <th className="table-head">User Info</th>
              <th className="table-head">Email</th>
              <th className="table-head">Address</th>
              <th className="table-head">Phone</th>
              <th className="table-head">Register date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="no-data">
                No customers found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // 12. JSX - таблица с данными
  return (
    <div className="customers-table-container">
      <table className="customer-table">
        {/* Заголовок таблицы */}
        <caption className="table-caption">Customers Data</caption>

        {/* Шапка таблицы */}
        <thead>
          <tr>
            <th className="table-head">User Info</th>
            <th className="table-head">Email</th>
            <th className="table-head">Address</th>
            <th className="table-head">Phone</th>
            <th className="table-head">Register date</th>
          </tr>
        </thead>

        {/* Тело таблицы - данные */}
        <tbody>
          {currentCustomers.map(customer => (
            <CustomerItem key={customer._id} customer={customer} />
          ))}
        </tbody>
      </table>

      {/* Пагинация - показываем если страниц больше 1 */}
      {totalPages > 1 && (
        <div className="pagination">
          {/* Создаем кнопки для каждой страницы */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btnn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersList;
