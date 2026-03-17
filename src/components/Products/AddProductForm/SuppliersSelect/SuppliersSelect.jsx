// ============================================
// SuppliersSelect.jsx - ВЫПАДАЮЩИЙ СПИСОК ПОСТАВЩИКОВ
// ============================================

// 1. ИМПОРТЫ
import React from 'react';
import Select from 'react-select';
import { useSuppliers } from '../../../../hooks/useSuppliers';
import './SuppliersSelect.css';

// 2. КОМПОНЕНТ
const SuppliersSelect = ({ suppliersValue, setSuppliersValue }) => {
  // 3. Получаем список поставщиков из Redux через хук
  const { suppliers } = useSuppliers();

  // 4. Преобразуем поставщиков в формат для react-select
  //    Из массива поставщиков делаем массив объектов { label, value }
  const suppliersList = suppliers.map(supplier => ({
    label: supplier.name || supplier.suppliers,
    value: supplier.name || supplier.suppliers,
  }));

  // 5. Функция при выборе поставщика
  const handleSuppliersChange = selectedOption => {
    setSuppliersValue(selectedOption?.value);
  };

  // 6. Находим выбранного поставщика для отображения
  const selectValue = suppliersValue
    ? suppliersList.find(option => option.value === suppliersValue)
    : null;

  return (
    <Select
      value={selectValue}
      onChange={handleSuppliersChange}
      options={suppliersList}
      placeholder="Supplier"
      maxMenuHeight={178}
      isClearable={true}
      className="suppliers-select"
      classNamePrefix="suppliers-select"
    />
  );
};

export default SuppliersSelect;
