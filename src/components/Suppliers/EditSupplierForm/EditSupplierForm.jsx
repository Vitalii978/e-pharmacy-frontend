import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { editSupplier } from '../../../redux/suppliers/operations';
import Modal from '../../Common/Modal/Modal';
import ButtonsModal from '../../Common/ButtonsModal/ButtonsModal';
import DeliveryDate from '../AddSupplierForm/DeliveryDate/DeliveryDate';
import StatusSelect from '../AddSupplierForm/StatusSelect/StatusSelect';
import './EditSupplierForm.css';

const editSupplierSchema = yup.object().shape({
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

const EditSupplierForm = ({ setIsModalOpen, supplier, setIsSubmitting }) => {
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = useState(supplier.date);
  const [statusValue, setStatusValue] = useState(supplier.status);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSupplierSchema),
  });

  useEffect(() => {
    if (dateValue) {
      setValue('date', dateValue);
    }
    if (statusValue) {
      setValue('status', statusValue);
    }
  }, [dateValue, statusValue, setValue]);

  const onSubmit = async data => {
    setIsSubmitting(true);
    setIsModalOpen(false);
    await dispatch(editSupplier({ data, id: supplier._id }));
    setIsSubmitting(false);
  };

  return (
    <Modal fn={setIsModalOpen}>
      <h2 className="form-title">Edit supplier</h2>

      <form className="edit-supplier-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label className="form-group">
            <input
              type="text"
              defaultValue={supplier.name}
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
              defaultValue={supplier.address}
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
              defaultValue={supplier.suppliers}
              placeholder="Company"
              className="form-input"
            />
            {errors.suppliers && (
              <span className="error-text">{errors.suppliers.message}</span>
            )}
          </label>

          <div className="form-group">
            <DeliveryDate setDateValue={setDateValue} dateValue={dateValue} />
            <input
              type="text"
              {...register('date')}
              defaultValue={supplier.date}
              className="hidden-input"
            />
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
              defaultValue={supplier.amount}
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
              defaultValue={supplier.status}
              className="hidden-input"
            />
            {errors.status && (
              <span className="error-text">{errors.status.message}</span>
            )}
          </div>
        </div>

        <ButtonsModal title="Save" cancelAction={setIsModalOpen} />
      </form>
    </Modal>
  );
};

export default EditSupplierForm;
