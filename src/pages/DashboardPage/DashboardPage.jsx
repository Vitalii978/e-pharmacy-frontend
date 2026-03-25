import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDashboardInfo } from '../../redux/dashboard/operations';
import Statistic from '../../components/Dashboard/Statistic/Statistic';
import RecentCustomers from '../../components/Dashboard/RecentCustomers/RecentCustomers';
import IncomeExpenses from '../../components/Dashboard/IncomeExpenses/IncomeExpenses';
import './DashboardPage.css';

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardInfo());
  }, [dispatch]);

  return (
    <div className="dashboard-page">
      <Statistic />
      <div className="dashboard-row">
        <RecentCustomers />
        <IncomeExpenses />
      </div>
    </div>
  );
};

export default DashboardPage;
