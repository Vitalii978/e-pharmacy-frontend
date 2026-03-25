import React from 'react';
import Select from 'react-select';
import { useSuppliers } from '../../../../hooks/useSuppliers';
import './SuppliersSelect.css';

const SuppliersSelect = ({ suppliersValue, setSuppliersValue }) => {
  const { suppliers } = useSuppliers();

  const suppliersList = suppliers.map(supplier => ({
    label: supplier.name || supplier.suppliers,
    value: supplier.name || supplier.suppliers,
  }));

  const handleSuppliersChange = selectedOption => {
    setSuppliersValue(selectedOption?.value);
  };

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
