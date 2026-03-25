import React from 'react';
import { useDashboard } from '../../../hooks/useDashboard';
import './RecentCustomers.css';

const RecentCustomers = () => {
  const { recentCustomers } = useDashboard();

  return (
    <section className="recent-customers">
      <table className="customers-table">
        <caption className="table-caption">Recent customers</caption>

        <thead>
          <tr>
            <th className="table-header-rec">Name</th>
            <th className="table-header-rec">Email</th>
            <th className="table-header-rec ">Spent</th>
          </tr>
        </thead>

        <tbody>
          {recentCustomers.map(customer => (
            <tr key={customer._id} className="table-row">
              <td className="table-cell-rec name-cell-rec">
                <div className="customer-info">
                  <img
                    src={customer.image || 'https://via.placeholder.com/24'}
                    alt={customer.name}
                    className="customer-avatar"
                  />
                  <span className="customer-name">{customer.name}</span>
                </div>
              </td>

              <td className="table-cell-rec email-cell-rec">
                {customer.email}
              </td>

              <td className="table-cell-rec spent-cell">{customer.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentCustomers;
