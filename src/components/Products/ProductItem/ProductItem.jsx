import React, { useState } from 'react';
import Buttons from '../Buttons/Buttons';
import EditProductForm from '../EditProductForm/EditProductForm';
import { useProducts } from '../../../hooks/useProducts';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const { name, category, price, stock, suppliers, _id } = product;
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productsLoading } = useProducts();
  const isLoading = productsLoading && isSubmitting;

  return (
    <>
      {isEdit && (
        <EditProductForm
          setIsEdit={setIsEdit}
          product={product}
          setIsSubmitting={setIsSubmitting}
        />
      )}

      <tr className="product-row">
        <td className="name-cell">
          {isLoading ? <span>Загрузка...</span> : name}
        </td>
        <td className="category-cell">
          {isLoading ? <span>Загрузка...</span> : category}
        </td>
        <td className="stock-cell">
          {isLoading ? <span>Загрузка...</span> : stock}
        </td>
        <td className="suppliers-cell">
          {isLoading ? <span>Загрузка...</span> : suppliers}
        </td>
        <td className="price-cell">
          {isLoading ? <span>Загрузка...</span> : price}
        </td>
        <td className="actions-cell">
          <Buttons
            id={_id}
            setIsEdit={setIsEdit}
            setIsSubmitting={setIsSubmitting}
          />
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
