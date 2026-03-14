// // ============================================
// // RecentCustomers.jsx - КОМПОНЕНТ СПИСКА ПОСЛЕДНИХ КЛИЕНТОВ
// // ============================================

// import React from 'react';
// import './RecentCustomers.css';

// // 1. Создаем компонент
// const RecentCustomers = () => {
//   return (
//     <div className="recent-customers">
//       <h2>Recent Customers</h2>
//       <p>Компонент в разработке</p>
//     </div>
//   );
// };

// // 2. ВАЖНО! Экспортируем компонент, чтобы другие файлы могли его импортировать
// export default RecentCustomers; // ← ЭТО ДОЛЖНО БЫТЬ В КОНЦЕ ФАЙЛА

// ============================================
// RecentCustomers.jsx - КОМПОНЕНТ СПИСКА ПОСЛЕДНИХ КЛИЕНТОВ
// ============================================

// 1. Импортируем React
import React from 'react';

// 2. Импортируем хук useDashboard для получения данных
import { useDashboard } from '../../../hooks/useDashboard';

// 3. ВРЕМЕННО ЗАКОММЕНТИРОВАНО - библиотека вызывает ошибку
// import EllipsisText from "react-ellipsis-text";

// 4. Импортируем хук для проверки размера экрана - УБИРАЕМ, РАЗ НЕ ИСПОЛЬЗУЕМ
// import { useMediaQuery } from "react-responsive";

// 5. Импортируем CSS
import './RecentCustomers.css';

// 6. СОЗДАЕМ КОМПОНЕНТ
const RecentCustomers = () => {
  // 7. УБИРАЕМ isTablet - она не используется
  // const isTablet = useMediaQuery({ minWidth: 768 });

  // 8. Получаем список последних клиентов из хука
  const { recentCustomers } = useDashboard();

  // 9. JSX - что увидит пользователь
  return (
    <section className="recent-customers">
      {/* 10. Заголовок секции */}
      <h2 className="section-title">Recent customers</h2>

      {/* 11. ТАБЛИЦА */}
      <table className="customers-table">
        {/* 12. ЗАГОЛОВОК ТАБЛИЦЫ */}
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Spent</th>
          </tr>
        </thead>

        {/* 13. ТЕЛО ТАБЛИЦЫ (данные) */}
        <tbody>
          {/* 14. Проходим по массиву recentCustomers и создаем строки */}
          {recentCustomers.map(customer => (
            <tr key={customer._id} className="table-row">
              {/* 15. ЯЧЕЙКА С ИМЕНЕМ И АВАТАРОМ */}
              <td className="table-cell name-cell">
                <div className="customer-info">
                  {/* Аватар (если нет фото, показываем заглушку) */}
                  <img
                    src={customer.image || 'https://via.placeholder.com/24'}
                    alt={customer.name}
                    className="customer-avatar"
                  />
                  {/* Имя клиента */}
                  <span className="customer-name">{customer.name}</span>
                </div>
              </td>

              {/* 16. ЯЧЕЙКА С EMAIL */}
              <td className="table-cell email-cell">{customer.email}</td>

              {/* 17. ЯЧЕЙКА С ПОТРАЧЕННОЙ СУММОЙ */}
              <td className="table-cell spent-cell">{customer.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

// 18. Экспортируем компонент
export default RecentCustomers;
