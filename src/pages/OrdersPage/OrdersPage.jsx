import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrders, getOrdersByQuery } from '../../redux/orders/operations';
import FilterBar from '../../components/FilterBar/FilterBar';
import OrdersTable from '../../components/OrdersTable/OrdersTable';
import PageContainer from '../../components/Common/PageContainer/PageContainer';
import './OrdersPage.css';

const OrdersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleFilter = query => {
    dispatch(getOrdersByQuery(query));
  };

  const handleReset = () => {
    dispatch(getOrders());
  };

  return (
    <PageContainer>
      <div className="orders-header">
        <FilterBar
          placeholder="User Name"
          onFilter={handleFilter}
          onReset={handleReset}
        />
      </div>
      <OrdersTable />
    </PageContainer>
  );
};

export default OrdersPage;
