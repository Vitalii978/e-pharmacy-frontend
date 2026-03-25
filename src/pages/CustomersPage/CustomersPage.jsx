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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleFilter = query => {
    dispatch(getCustomersByQuery(query));
  };

  const handleReset = () => {
    dispatch(getCustomers());
  };

  return (
    <PageContainer>
      <FilterBar
        placeholder="User Name"
        onFilter={handleFilter}
        onReset={handleReset}
      />

      <CustomersList />
    </PageContainer>
  );
};

export default CustomersPage;
