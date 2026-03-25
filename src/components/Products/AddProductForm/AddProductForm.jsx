import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addProductSchema } from '../../../schemas/shemas';
import { addProduct } from '../../../redux/products/operations';
import Modal from '../../Common/Modal/Modal';
import ButtonsModal from '../../Common/ButtonsModal/ButtonsModal';
import CategorySelect from './CategorySelect/CategorySelect';
import SuppliersSelect from './SuppliersSelect/SuppliersSelect';
import './AddProductForm.css';

const AddProductForm = ({ setShowModal }) => {
  <AddProductForm setShowModal={setShowModal} />;
  const [categoryValue, setCategoryValue] = useState(null);

  const [suppliersValue, setSuppliersValue] = useState(null);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
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

  const onSubmit = data => {
    dispatch(addProduct(data));

    setShowModal(false);
  };

  return (
    <Modal fn={setShowModal}>
      <h2 className="add-form-title">Add a new product</h2>

      <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="add-form-row">
          <div className="add-form-group">
            <input
              type="text"
              {...register('name')}
              placeholder="Product Info"
              className="add-form-input"
            />
            {errors.name && (
              <p className="add-form-error">{errors.name.message}</p>
            )}
          </div>

          <div className="add-form-group">
            <CategorySelect
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
            />
            {errors.category && (
              <p className="add-form-error">{errors.category.message}</p>
            )}

            <input
              type="text"
              {...register('category')}
              className="add-form-hidden"
            />
          </div>
        </div>

        <div className="add-form-row">
          <div className="add-form-group">
            <SuppliersSelect
              suppliersValue={suppliersValue}
              setSuppliersValue={setSuppliersValue}
            />
            {errors.suppliers && (
              <p className="add-form-error">{errors.suppliers.message}</p>
            )}
            <input
              type="text"
              {...register('suppliers')}
              className="add-form-hidden"
            />
          </div>

          <div className="add-form-group">
            <input
              type="text"
              {...register('stock')}
              placeholder="Stock"
              className="add-form-input"
            />
            {errors.stock && (
              <p className="add-form-error">{errors.stock.message}</p>
            )}
          </div>
        </div>

        <div className="add-form-group">
          <input
            type="text"
            {...register('price')}
            placeholder="Price"
            className="add-form-input"
          />
          {errors.price && (
            <p className="add-form-error">{errors.price.message}</p>
          )}
        </div>

        <ButtonsModal title="Add" cancelAction={setShowModal} />
      </form>
    </Modal>
  );
};

export default AddProductForm;
