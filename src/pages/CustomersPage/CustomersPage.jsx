// ============================================
// CustomersPage.jsx - ЭТО СТРАНИЦА, КОТОРУЮ ВИДИТ ПОЛЬЗОВАТЕЛЬ
// ============================================

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCustomers,
  getCustomersByQuery,
} from '../../redux/customers/operations';
import FilterBar from '../../components/FilterBar/FilterBar';
import CustomersList from '../../components/Customers/CustomersList';
import PageContainer from '../../components/Common/PageContainer/PageContainer';
import './CustomersPage.css';

const CustomersPage = () => {
  // useDispatch - это "пульт", которым мы отправляем команды в Redux
  // Откуда: из react-redux
  const dispatch = useDispatch();

  // useEffect - это "когда страница загрузилась, сделай это"
  // useEffect с пустым массивом [] выполняется 1 раз при загрузке
  useEffect(() => {
    // dispatch(getCustomers()) - отправляем команду "загрузить клиентов"
    // getCustomers - это действие из operations.js
    dispatch(getCustomers());
  }, [dispatch]);

  // handleFilter - вызывается когда пользователь нажал кнопку Filter
  const handleFilter = query => {
    // dispatch(getCustomersByQuery(query)) - отправляем команду "найти клиентов по имени"
    dispatch(getCustomersByQuery(query));
  };

  // handleReset - вызывается когда пользователь нажал крестик сброса
  const handleReset = () => {
    // dispatch(getCustomers()) - отправляем команду "загрузить всех клиентов"
    dispatch(getCustomers());
  };

  return (
    <PageContainer>
      {/* FilterBar - поле поиска */}
      <FilterBar
        placeholder="User Name"
        onFilter={handleFilter}
        onReset={handleReset}
      />

      {/* CustomersList - таблица клиентов */}
      <CustomersList />
    </PageContainer>
  );
};

export default CustomersPage;
