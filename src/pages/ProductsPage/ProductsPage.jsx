import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getProducts,
  getProductsByQuery,
} from '../../redux/products/operations';
import { getSuppliers } from '../../redux/suppliers/operations';
import FilterBar from '../../components/FilterBar/FilterBar';
import ProductsTable from '../../components/Products/ProductsTable/ProductsTable';
import AddProduct from '../../components/Products/AddProduct/AddProduct';
import PageContainer from '../../components/Common/PageContainer/PageContainer';
import './ProductsPage.css';

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());

    dispatch(getSuppliers());
  }, [dispatch]);

  const handleFilter = query => {
    dispatch(getProductsByQuery(query));
  };

  const handleReset = () => {
    dispatch(getProducts());
  };

  return (
    <PageContainer>
      <div className="products-header">
        <FilterBar
          placeholder="Product Name"
          onFilter={handleFilter}
          onReset={handleReset}
        />

        <AddProduct setIsModalOpen={setIsModalOpen} />
      </div>

      <ProductsTable
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </PageContainer>
  );
};

export default ProductsPage;
