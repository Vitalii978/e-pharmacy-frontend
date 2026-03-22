// ============================================
// CustomersList.jsx - ТАБЛИЦА КЛИЕНТОВ С ПАГИНАЦИЕЙ
// ============================================

// 1. ИМПОРТЫ
//    useState - для хранения номера текущей страницы
import React, { useState } from 'react';

// 2. Импортируем хук для получения данных о клиентах
import { useCustomers } from '../../hooks/useCustomers';

// 3. Импортируем компонент одной строки таблицы
import CustomerItem from './CustomerItem/CustomerItem';

// 4. Импортируем CSS
import './CustomersList.css';

// 5. КОМПОНЕНТ
const CustomersList = () => {
  // 6. Получаем данные из Redux через хук useCustomers
  // useCustomers() - забираем клиентов из Redux
  const { customers } = useCustomers();

  // 7. Состояние для пагинации
  // useState для пагинации (какая страница сейчас)
  const [currentPage, setCurrentPage] = useState(1); // текущая страница начинается с 1

  // 8. Сколько клиентов показывать на одной странице
  const itemsPerPage = 5;

  // 9. ВЫЧИСЛЯЕМ ДАННЫЕ ДЛЯ ПАГИНАЦИИ

  // 9.1 Общее количество страниц
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // 9.2 Индекс первого клиента на текущей странице
  const startIndex = (currentPage - 1) * itemsPerPage;

  // 9.3 Индекс последнего клиента на текущей странице
  const endIndex = startIndex + itemsPerPage;

  // 9.4 Клиенты, которые показываем на текущей странице
  //     Если клиентов меньше 5 - показываем всех
  const currentCustomers =
    customers?.length > 5 ? customers.slice(startIndex, endIndex) : customers;

  // 10. Функция для переключения страницы
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  // 11. Если клиентов нет - показываем сообщение
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
