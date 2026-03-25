import React from 'react';
import { useDashboard } from '../../../hooks/useDashboard';
import './IncomeExpenses.css';

const IncomeExpenses = () => {
  const { incomeExpenses } = useDashboard();

  return (
    <section className="income-expenses">
      <table className="income-table">
        <caption className="table-caption">Income/Expenses</caption>
        <thead>
          <tr>
            <th className="table-header-inc">Today</th>
            <th className="table-header-inc"></th>
            <th className="table-header-inc"></th>
          </tr>
        </thead>

        <tbody>
          {incomeExpenses.map((item, index) => {
            const typeClass = item.type === 'Income' ? 'income' : 'expense';

            return (
              <tr key={index} className="income-row">
                <td className="table-cell type-cell">
                  <span className={`type-badge ${typeClass}`}>{item.type}</span>
                </td>
                <td className="table-cell name-cel">{item.name}</td>
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

export default IncomeExpenses;
