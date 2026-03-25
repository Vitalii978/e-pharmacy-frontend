import React from 'react';
import Select from 'react-select';
import { categories } from '../../../../lib/categories';
import './CategorySelect.css';

const CategorySelect = ({ categoryValue, setCategoryValue }) => {
  const handleCategoryChange = selectedOption => {
    setCategoryValue(selectedOption?.value);
  };

  const selectValue = categoryValue
    ? categories.find(option => option.value === categoryValue)
    : null;

  return (
    <Select
      value={selectValue}
      onChange={handleCategoryChange}
      options={categories}
      placeholder="Category"
      maxMenuHeight={178}
      isClearable={true}
      className="category-select"
      classNamePrefix="category-select"
    />
  );
};

export default CategorySelect;
