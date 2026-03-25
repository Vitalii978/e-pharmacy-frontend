import React from 'react';
import { useDashboard } from '../../../hooks/useDashboard';
import sprite from '../../../assets/sprite.svg';
import './Statistic.css';
const Statistic = () => {
  const { allCustomers, allProducts, allSuppliers } = useDashboard();

  return (
    <div className="statistic-container">
      <div className="stat-card">
        <div className="stat-icon">
          <svg width={18} height={18}>
            <use xlinkHref={`${sprite}#icon-currency`}></use>
          </svg>

          <p className="stat-label">All products</p>
        </div>

        <div className="stat-info">
          <p className="stat-number">{allProducts || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <svg width={18} height={18}>
            <use xlinkHref={`${sprite}#icon-ci_users`}></use>
          </svg>
          <p className="stat-label">All suppliers</p>
        </div>
        <div className="stat-info">
          <p className="stat-number">{allSuppliers || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <svg width={18} height={18}>
            <use xlinkHref={`${sprite}#icon-ci_users`}></use>
          </svg>
          <p className="stat-label">All customers</p>
        </div>
        <div className="stat-info">
          <p className="stat-number">{allCustomers || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
