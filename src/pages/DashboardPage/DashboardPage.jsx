// ============================================
// DashboardPage.jsx - ГЛАВНАЯ СТРАНИЦА АДМИНКИ
// ============================================

// 1. Импорты
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDashboardInfo } from '../../redux/dashboard/operations';

// 2. Импорты компонентов
import Statistic from '../../components/Dashboard/Statistic/Statistic';
import RecentCustomers from '../../components/Dashboard/RecentCustomers/RecentCustomers';
import IncomeExpenses from '../../components/Dashboard/IncomeExpenses/IncomeExpenses';

// 3. Импорт стилей
import './DashboardPage.css';

// 4. КОМПОНЕНТ
const DashboardPage = () => {
  const dispatch = useDispatch();

  // 5. Загружаем данные при монтировании
  useEffect(() => {
    dispatch(getDashboardInfo());
  }, [dispatch]);

  // 6. JSX
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      {/* 7. Карточки статистики */}
      <Statistic />

      {/* 8. Два компонента в ряд на десктопе */}
      <div className="dashboard-row">
        <RecentCustomers />
        <IncomeExpenses />
      </div>
    </div>
  );
};

export default DashboardPage;
