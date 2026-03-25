import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addSupplier } from '../../../redux/suppliers/operations';
import Modal from '../../Common/Modal/Modal';
import ButtonsModal from '../../Common/ButtonsModal/ButtonsModal';
import DeliveryDate from './DeliveryDate/DeliveryDate';
import StatusSelect from './StatusSelect/StatusSelect';
import './AddSupplierForm.css';

const addSupplierSchema = yup.object().shape({
  name: yup.string().min(4, 'Минимум 4 символа').required('Обязательное поле'),
  address: yup.string().required('Обязательное поле'),
  suppliers: yup.string().required('Обязательное поле'),
  date: yup.string().required('Обязательное поле'),
  amount: yup.string().required('Обязательное поле'),
  status: yup
    .string()
    .oneOf(['Active', 'Deactive'])
    .required('Обязательное поле'),
});

const AddSupplierForm = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSupplierSchema),
  });

  useEffect(() => {
    if (dateValue) {
      setValue('date', dateValue);
    }
    if (statusValue) {
      setValue('status', statusValue);
    }
  }, [dateValue, statusValue, setValue]);

  const onSubmit = data => {
    dispatch(addSupplier(data));
    setIsModalOpen(false);
  };

  return (
    <Modal fn={setIsModalOpen}>
      <h2 className="form-title">Add a new suppliers</h2>

      <form className="add-supplier-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label className="form-group">
            <input
              type="text"
              {...register('name')}
              placeholder="Suppliers Info"
              className="form-input"
            />
            {errors.name && (
              <span className="error-text">{errors.name.message}</span>
            )}
          </label>

          <label className="form-group">
            <input
              type="text"
              {...register('address')}
              placeholder="Address"
              className="form-input"
            />
            {errors.address && (
              <span className="error-text">{errors.address.message}</span>
            )}
          </label>
        </div>

        <div className="form-row">
          <label className="form-group">
            <input
              type="text"
              {...register('suppliers')}
              placeholder="Company"
              className="form-input"
            />
            {errors.suppliers && (
              <span className="error-text">{errors.suppliers.message}</span>
            )}
          </label>

          <div className="form-group">
            <DeliveryDate setDateValue={setDateValue} dateValue={dateValue} />

            <input type="text" {...register('date')} className="hidden-input" />
            {errors.date && (
              <span className="error-text">{errors.date.message}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <label className="form-group">
            <input
              type="text"
              {...register('amount')}
              placeholder="Amount"
              className="form-input"
            />
            {errors.amount && (
              <span className="error-text">{errors.amount.message}</span>
            )}
          </label>

          <div className="form-group">
            <StatusSelect
              statusValue={statusValue}
              setStatusValue={setStatusValue}
            />

            <input
              type="text"
              {...register('status')}
              className="hidden-input"
            />
            {errors.status && (
              <span className="error-text">{errors.status.message}</span>
            )}
          </div>
        </div>

        <ButtonsModal title="Add" cancelAction={setIsModalOpen} />
      </form>
    </Modal>
  );
};

export default AddSupplierForm;
