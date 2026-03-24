// ============================================
// StatusSelect.jsx - ВЫБОР СТАТУСА (Active/Deactive)
// ============================================

// 1. ИМПОРТЫ
//    React - нужен для создания компонента
import React from 'react';

//    Select - компонент выпадающего списка из библиотеки react-select
//    Откуда: установили через npm install react-select
//    Зачем: чтобы пользователь мог выбрать статус (Active/Deactive)
//    Преимущества: красивый дизайн, есть крестик для сброса, можно искать
import Select from 'react-select';

//    Импортируем стили
import './StatusSelect.css';

// ============================================
// КОМПОНЕНТ StatusSelect
// ============================================
// Принимает:
//   statusValue - текущее значение статуса (приходит из AddSupplierForm)
//   setStatusValue - функция для изменения статуса (приходит из AddSupplierForm)
const StatusSelect = ({ statusValue, setStatusValue }) => {
  // 2. ВАРИАНТЫ ДЛЯ ВЫБОРА
  //    Массив объектов, каждый объект имеет label (что видит пользователь)
  //    и value (что сохраняется в данных)
  const statuses = [
    { label: 'Active', value: 'Active' }, // активный
    { label: 'Deactive', value: 'Deactive' }, // неактивный
  ];

  // 3. ФУНКЦИЯ handleByStatus - вызывается, когда пользователь выбирает статус
  //    selectedOption - выбранный объект { label, value }
  const handleByStatus = selectedOption => {
    // Если выбрали что-то - сохраняем value
    // Если нажали крестик (selectedOption = null) - сохраняем null
    setStatusValue(selectedOption?.value);
  };

  // 4. НАХОДИМ ВЫБРАННЫЙ СТАТУС ДЛЯ ОТОБРАЖЕНИЯ
  //    Если statusValue есть - ищем в массиве statuses объект с таким же value
  //    Если нет - selectValue = null (ничего не выбрано)
  const selectValue =
    statusValue === null
      ? null
      : statuses.find(option => option.value === statusValue);

  // ============================================
  // JSX - ВЫПАДАЮЩИЙ СПИСОК
  // ============================================
  return (
    <Select
      // value - текущее выбранное значение (отображается в поле)
      value={selectValue}
      // onChange - функция, вызываемая при выборе
      onChange={handleByStatus}
      // options - массив вариантов для выбора
      options={statuses}
      // placeholder - текст-подсказка, когда ничего не выбрано
      placeholder="Status"
      // maxMenuHeight - максимальная высота выпадающего меню
      maxMenuHeight={178}
      // isClearable - можно ли очистить (показывает крестик)
      isClearable={true}
      // className - класс для CSS
      className="status-select"
      // classNamePrefix - префикс для CSS классов
      // Все классы будут начинаться с "status-select__"
      // Например: status-select__control, status-select__menu
      classNamePrefix="status-select"
    />
  );
};

export default StatusSelect;
