// ============================================
// CategorySelect.jsx - ВЫПАДАЮЩИЙ СПИСОК КАТЕГОРИЙ
// ============================================

// 1. ИМПОРТЫ
import React from "react";
import Select from "react-select"; // библиотека для красивых select
import { categories } from "../../../../lib/categories";
import "./CategorySelect.css"; // обычный CSS

// 2. КОМПОНЕНТ
const CategorySelect = ({ categoryValue, setCategoryValue }) => {

  // 3. Функция, которая вызывается когда пользователь выбирает категорию
  const handleCategoryChange = (selectedOption) => {
    // selectedOption - это объект { label: "Medicine", value: "Medicine" }
    // selectedOption?.value - достаем value, если selectedOption не null
    setCategoryValue(selectedOption?.value);
  };

  // 4. Находим выбранную категорию для отображения в select
  //    Если categoryValue есть, ищем в массиве categories объект с таким value
  //    Если нет - возвращаем null (ничего не выбрано)
  const selectValue = categoryValue
    ? categories.find((option) => option.value === categoryValue)
    : null;

  return (
    <Select
      value={selectValue}
      onChange={handleCategoryChange}
      options={categories}
      placeholder="Category"
      maxMenuHeight={178}
      isClearable={true}
      className="category-select"           // класс для контейнера
      classNamePrefix="category-select"     // префикс для вложенных элементов
    />
  );
};

export default CategorySelect;