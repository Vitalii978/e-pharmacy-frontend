// ============================================
// AddSupplierForm.jsx - ФОРМА ДОБАВЛЕНИЯ ПОСТАВЩИКА
// ============================================

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

// ============================================
// СХЕМА ВАЛИДАЦИИ
// ============================================
// yup.object().shape() - создаем объект с правилами проверки
// .min(4) - минимум 4 символа
// .required() - обязательное поле
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

// ============================================
// КОМПОНЕНТ AddSupplierForm
// ============================================
const AddSupplierForm = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();

  // 1. СОСТОЯНИЯ для календаря и выбора статуса
  //    dateValue - выбранная дата (null - ничего не выбрано)
  //    setDateValue - функция для изменения dateValue
  const [dateValue, setDateValue] = useState(null);
  const [statusValue, setStatusValue] = useState(null);

  // 2. НАСТРОЙКА ФОРМЫ с react-hook-form
  //    register - регистрирует поля ввода (связывает их с формой)
  //    handleSubmit - оборачивает функцию onSubmit, проверяет валидацию
  //    setValue - позволяет вручную установить значение поля
  //    formState.errors - объект с ошибками валидации
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSupplierSchema), // подключаем схему валидации
  });

  // 3. useEffect - выполняется каждый раз, когда меняется dateValue или statusValue
  //    Зачем? Потому что календарь и Select - это не стандартные input'ы
  //    react-hook-form не видит, когда они меняются. Мы вручную обновляем скрытые поля.
  useEffect(() => {
    if (dateValue) {
      setValue('date', dateValue); // обновляем скрытое поле "date"
    }
    if (statusValue) {
      setValue('status', statusValue); // обновляем скрытое поле "status"
    }
  }, [dateValue, statusValue, setValue]);

  // 4. ФУНКЦИЯ ОТПРАВКИ
  //    вызывается, когда форма прошла валидацию
  //    data - объект с данными формы { name, address, suppliers, date, amount, status }
  const onSubmit = data => {
    dispatch(addSupplier(data)); // отправляем данные в Redux (на сервер)
    setIsModalOpen(false); // закрываем модалку
  };

  // ============================================
  // JSX - ФОРМА
  // ============================================
  return (
    <Modal fn={setIsModalOpen}>
      <h2 className="form-title">Add a new suppliers</h2>

      <form className="add-supplier-form" onSubmit={handleSubmit(onSubmit)}>
        {/* РЯД 1: Suppliers Info и Address */}
        <div className="form-row">
          {/* Поле "Suppliers Info" */}
          <label className="form-group">
            <input
              type="text"
              {...register('name')} // регистрируем поле "name"
              placeholder="Suppliers Info"
              className="form-input"
            />
            {/* Если есть ошибка валидации для поля "name" - показываем */}
            {errors.name && (
              <span className="error-text">{errors.name.message}</span>
            )}
          </label>

          {/* Поле "Address" */}
          <label className="form-group">
            <input
              type="text"
              {...register('address')} // регистрируем поле "address"
              placeholder="Address"
              className="form-input"
            />
            {errors.address && (
              <span className="error-text">{errors.address.message}</span>
            )}
          </label>
        </div>

        {/* РЯД 2: Company и Delivery Date */}
        <div className="form-row">
          {/* Поле "Company" */}
          <label className="form-group">
            <input
              type="text"
              {...register('suppliers')} // регистрируем поле "suppliers"
              placeholder="Company"
              className="form-input"
            />
            {errors.suppliers && (
              <span className="error-text">{errors.suppliers.message}</span>
            )}
          </label>

          {/* КАЛЕНДАРЬ */}
          <div className="form-group">
            <DeliveryDate
              setDateValue={setDateValue} // функция для установки даты
              dateValue={dateValue} // текущее значение даты
            />
            {/* СКРЫТОЕ ПОЛЕ для react-hook-form */}
            {/* Пользователь его не видит, но форма знает, что дата есть */}
            <input
              type="text"
              {...register('date')} // регистрируем поле "date"
              className="hidden-input" // скрытое поле (CSS: display: none)
            />
            {errors.date && (
              <span className="error-text">{errors.date.message}</span>
            )}
          </div>
        </div>

        {/* РЯД 3: Amount и Status */}
        <div className="form-row">
          {/* Поле "Amount" */}
          <label className="form-group">
            <input
              type="text"
              {...register('amount')} // регистрируем поле "amount"
              placeholder="Amount"
              className="form-input"
            />
            {errors.amount && (
              <span className="error-text">{errors.amount.message}</span>
            )}
          </label>

          {/* ВЫБОР СТАТУСА */}
          <div className="form-group">
            <StatusSelect
              statusValue={statusValue} // текущее значение статуса
              setStatusValue={setStatusValue} // функция для изменения статуса
            />
            {/* СКРЫТОЕ ПОЛЕ для react-hook-form */}
            <input
              type="text"
              {...register('status')} // регистрируем поле "status"
              className="hidden-input" // скрытое поле
            />
            {errors.status && (
              <span className="error-text">{errors.status.message}</span>
            )}
          </div>
        </div>

        {/* КНОПКИ Save и Cancel */}
        <ButtonsModal title="Add" cancelAction={setIsModalOpen} />
      </form>
    </Modal>
  );
};

export default AddSupplierForm;
