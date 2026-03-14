// // ============================================
// // IncomeExpenses.jsx - КОМПОНЕНТ ДОХОДОВ/РАСХОДОВ
// // ============================================

// import React from 'react';
// import './IncomeExpenses.css';

// // ВАЖНО: ЕСТЬ ЛИ ЗДЕСЬ export default?
// const IncomeExpenses = () => {
//   return (
//     <div>
//       <h2>Income/Expenses</h2>
//       <p>Компонент в разработке</p>
//     </div>
//   );
// };

// export default IncomeExpenses; // ← ЭТО ДОЛЖНО БЫТЬ В КОНЦЕ ФАЙЛА

// ============================================
// IncomeExpenses.jsx - КОМПОНЕНТ ДОХОДОВ И РАСХОДОВ
// ============================================

// 1. Импортируем React
import React from 'react';

// 2. Импортируем хук useDashboard для получения данных
import { useDashboard } from '../../../hooks/useDashboard';

// 3. Импортируем CSS
import './IncomeExpenses.css';

// 4. СОЗДАЕМ КОМПОНЕНТ
const IncomeExpenses = () => {
  // 5. Получаем данные о доходах/расходах из хука
  const { incomeExpenses } = useDashboard();

  // 6. JSX - что увидит пользователь
  return (
    <section className="income-expenses">
      {/* 7. Заголовок секции */}
      <h2 className="section-title">Income/Expenses</h2>

      {/* 8. ТАБЛИЦА */}
      <table className="income-table">
        {/* 9. ЗАГОЛОВОК ТАБЛИЦЫ */}
        <thead>
          <tr>
            <th className="table-header">Today</th>
            <th className="table-header"></th>
            <th className="table-header"></th>
          </tr>
        </thead>

        {/* 10. ТЕЛО ТАБЛИЦЫ */}
        <tbody>
          {/* 11. Проходим по массиву incomeExpenses и создаем строки */}
          {incomeExpenses.map((item, index) => {
            // 12. Определяем класс в зависимости от типа (Income/Expense)
            const typeClass = item.type === 'Income' ? 'income' : 'expense';

            return (
              <tr key={index} className="income-row">
                {/* 13. ЯЧЕЙКА С ТИПОМ (Income/Expense) */}
                <td className="table-cell type-cell">
                  <span className={`type-badge ${typeClass}`}>{item.type}</span>
                </td>

                {/* 14. ЯЧЕЙКА С НАЗВАНИЕМ */}
                <td className="table-cell name-cell">{item.name}</td>

                {/* 15. ЯЧЕЙКА С СУММОЙ */}
                <td className={`table-cell amount-cell ${typeClass}`}>
                  {item.amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

// 16. Экспортируем компонент
export default IncomeExpenses;
