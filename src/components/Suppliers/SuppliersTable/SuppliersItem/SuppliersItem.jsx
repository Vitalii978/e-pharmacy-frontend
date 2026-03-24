// ============================================
// SuppliersItem.jsx - ОДНА СТРОКА В ТАБЛИЦЕ
// ============================================

import React, { useState } from 'react';
import { useSuppliers } from '../../../../hooks/useSuppliers';
import EditBtn from '../../EditBtn/EditBtn';
import EditSupplierForm from '../../EditSupplierForm/EditSupplierForm';
import './SuppliersItem.css';

// КОМПОНЕНТ SuppliersItem
// Принимает supplier - объект с данными одного поставщика
const SuppliersItem = ({ supplier }) => {
  // 1. ДЕСТРУКТУРИЗАЦИЯ - достаем нужные поля из объекта supplier
  //    { name, address, status, amount, date, suppliers, _id } = supplier
  //    Это то же самое, что написать:
  //    const name = supplier.name;
  //    const address = supplier.address;
  //    и так далее...
  const { name, address, status, amount, date, suppliers, _id } = supplier;

  // 2. СОСТОЯНИЯ
  //    isSubmitting - отслеживаем, идет ли отправка (показывать лоадер)
  const [isSubmitting, setIsSubmitting] = useState(false);

  //    openEditModal - открыта ли форма редактирования
  const [openEditModal, setOpenEditModal] = useState(false);

  // 3. ПОЛУЧАЕМ ФЛАГ ЗАГРУЗКИ ИЗ REDUX
  //    suppliersLoading - true, когда данные загружаются с сервера
  const { suppliersLoading } = useSuppliers();

  // 4. НУЖНО ЛИ ПОКАЗЫВАТЬ ЛОАДЕР?
  //    suppliersLoading && isSubmitting - оба должны быть true
  const isLoading = suppliersLoading && isSubmitting;

  // 5. ФОРМАТИРУЕМ СУММУ
  //    Если сумма начинается с символа "৳" (така - валюта Бангладеш), убираем его
  let amountValue = amount;
  if (amount && amount.charAt(0) === '৳') {
    amountValue = amount.substring(1); // убираем первый символ
  }

  // 6. ФУНКЦИЯ ДЛЯ ОПРЕДЕЛЕНИЯ CSS КЛАССА СТАТУСА
  //    Если статус "Active" - возвращаем "status-active"
  //    Если статус "Deactive" - возвращаем "status-deactive"
  // Возвращает "status-badge active" или "status-badge deactive"
  const getStatusClass = status => {
    return status === 'Active'
      ? 'status-badge active'
      : 'status-badge deactive';
  };

  // ============================================
  // JSX - ОДНА СТРОКА ТАБЛИЦЫ
  // ============================================
  return (
    <>
      {/* Если openEditModal = true, показываем форму редактирования */}
      {openEditModal && (
        <EditSupplierForm
          setIsModalOpen={setOpenEditModal} // чтобы форма могла закрыть себя
          supplier={supplier} // данные поставщика для редактирования
          setIsSubmitting={setIsSubmitting} // чтобы форма могла включить лоадер
        />
      )}

      {/* tr - строка таблицы */}
      <tr className="supplier-row">
        {/* td - ячейка "Suppliers Info" (имя поставщика) */}
        <td className="supplier-celll name-celll">
          {isLoading ? <span className="loader">...</span> : name}
        </td>

        {/* td - ячейка "Address" (адрес) */}
        <td className="supplier-celll address-celll">
          {isLoading ? <span className="loader">...</span> : address}
        </td>

        {/* td - ячейка "Company" (название компании) */}
        <td className="supplier-celll company-celll">
          {isLoading ? <span className="loader">...</span> : suppliers}
        </td>

        {/* td - ячейка "Delivery Date" (дата доставки) */}
        <td className="supplier-celll date-celll">
          {isLoading ? <span className="loader">...</span> : date}
        </td>

        {/* td - ячейка "Amount" (сумма) */}
        <td className="supplier-celll amount-celll">
          {isLoading ? <span className="loader">...</span> : amountValue}
        </td>

        {/* td - ячейка "Status" (статус) */}
        <td className="supplier-celll status-celll ">
          {isLoading ? (
            <span className="loader">...</span>
          ) : (
            <span className={getStatusClass(status)}>{status}</span>
          )}
        </td>

        {/* td - ячейка "Action" (кнопка редактирования) */}
        <td className="supplier-celll action-celll">
          <EditBtn setOpenEditModal={setOpenEditModal} />
        </td>
      </tr>
    </>
  );
};

export default SuppliersItem;
