import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getSuppliers,
  getSuppliersByQuery,
} from '../../redux/suppliers/operations';
import FilterBar from '../../components/FilterBar/FilterBar';
import SuppliersTable from '../../components/Suppliers/SuppliersTable/SuppliersTable';
import AddSupplierBtn from '../../components/Suppliers/AddSupplierBtn/AddSupplierBtn';
import AddSupplierForm from '../../components/Suppliers/AddSupplierForm/AddSupplierForm';
import PageContainer from '../../components/Common/PageContainer/PageContainer';
import './SuppliersPage.css';

const SuppliersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const handleFilter = query => {
    dispatch(getSuppliersByQuery(query));
  };

  const handleReset = () => {
    dispatch(getSuppliers());
  };

  return (
    <PageContainer>
      {isModalOpen && <AddSupplierForm setIsModalOpen={setIsModalOpen} />}
      <div className="suppliers-header">
        <FilterBar
          placeholder="User Name"
          onFilter={handleFilter}
          onReset={handleReset}
        />
        <AddSupplierBtn setIsModalOpen={setIsModalOpen} />
      </div>
      <SuppliersTable />
    </PageContainer>
  );
};

export default SuppliersPage;
