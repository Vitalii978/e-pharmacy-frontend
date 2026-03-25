import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { editProductSchema } from '../../../schemas/shemas';
import { editProduct } from '../../../redux/products/operations';
import Modal from '../../Common/Modal/Modal';
import ButtonsModal from '../../Common/ButtonsModal/ButtonsModal';
import CategorySelect from '../AddProductForm/CategorySelect/CategorySelect.jsx';
import SuppliersSelect from '../AddProductForm/SuppliersSelect/SuppliersSelect';
import './EditProductForm.css';

const EditProductForm = ({ setIsEdit, product, setIsSubmitting }) => {
  const [categoryValue, setCategoryValue] = useState(product.category);
  const [suppliersValue, setSuppliersValue] = useState(product.suppliers);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProductSchema),
  });

  useEffect(() => {
    if (categoryValue) {
      setValue('category', categoryValue);
    }
  }, [categoryValue, setValue]);

  useEffect(() => {
    if (suppliersValue) {
      setValue('suppliers', suppliersValue);
    }
  }, [suppliersValue, setValue]);

  const onSubmit = async data => {
    setIsSubmitting(true);
    setIsEdit(false);
    await dispatch(editProduct({ data, id: product._id }));

    setIsSubmitting(false);
  };

  return (
    <Modal fn={setIsEdit}>
      <h2 className="edit-form-title">Edit product</h2>
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-form-row">
          <div className="edit-form-group">
            <input
              type="text"
              {...register('name')}
              defaultValue={product.name}
              placeholder="Product Info"
              className="edit-form-input"
            />
            {errors.name && (
              <p className="edit-form-error">{errors.name.message}</p>
            )}
          </div>

          <div className="edit-form-group">
            <CategorySelect
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
            />
            {errors.category && (
              <p className="edit-form-error">{errors.category.message}</p>
            )}
            <input
              type="text"
              {...register('category')}
              defaultValue={product.category}
              className="edit-form-hidden"
            />
          </div>
        </div>
        <div className="edit-form-row">
          <div className="edit-form-group">
            <SuppliersSelect
              suppliersValue={suppliersValue}
              setSuppliersValue={setSuppliersValue}
            />
            {errors.suppliers && (
              <p className="edit-form-error">{errors.suppliers.message}</p>
            )}
            <input
              type="text"
              {...register('suppliers')}
              defaultValue={product.suppliers}
              className="edit-form-hidden"
            />
          </div>

          <div className="edit-form-group">
            <input
              type="text"
              {...register('stock')}
              defaultValue={product.stock}
              placeholder="Stock"
              className="edit-form-input"
            />
            {errors.stock && (
              <p className="edit-form-error">{errors.stock.message}</p>
            )}
          </div>
        </div>

        <div className="edit-form-group">
          <input
            type="text"
            {...register('price')}
            defaultValue={product.price}
            placeholder="Price"
            className="edit-form-input"
          />
          {errors.price && (
            <p className="edit-form-error">{errors.price.message}</p>
          )}
        </div>

        <ButtonsModal title="Save" cancelAction={setIsEdit} />
      </form>
    </Modal>
  );
};

export default EditProductForm;
