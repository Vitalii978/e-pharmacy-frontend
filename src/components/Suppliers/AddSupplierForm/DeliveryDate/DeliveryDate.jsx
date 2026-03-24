// ============================================
// DeliveryDate.jsx - КАЛЕНДАРЬ ДЛЯ ВЫБОРА ДАТЫ
// ============================================

// 1. ИМПОРТЫ
//    React - нужен для создания компонента
import React from 'react';

//    dayjs - библиотека для работы с датами
//    Откуда: установили через npm install dayjs
//    Зачем: чтобы форматировать даты (October 15, 2025)
import dayjs from 'dayjs';

//    DatePicker - компонент календаря из MUI (Material-UI)
//    Откуда: из библиотеки @mui/x-date-pickers
//    Зачем: чтобы пользователь мог выбрать дату из календаря
import { DatePicker } from '@mui/x-date-pickers';

//    IconCalendar - наша иконка календаря (из спрайта)
import IconCalendar from './IconCalendar/IconCalendar';

//    Импортируем стили
import './DeliveryDate.css';

// ============================================
// КОМПОНЕНТ DeliveryDate
// ============================================
// Принимает:
//   setDateValue - функция для установки выбранной даты (приходит из AddSupplierForm)
//   dateValue - текущее значение даты (приходит из AddSupplierForm)
const DeliveryDate = ({ setDateValue, dateValue }) => {
  // 2. ФУНКЦИЯ handleDatePicker - вызывается, когда пользователь выбирает дату
  //    newValue - выбранная дата в формате dayjs
  const handleDatePicker = newValue => {
    if (newValue) {
      // Форматируем дату в строку "October 15, 2025"
      // .format("MMMM D, YYYY") - это метод dayjs
      // MMMM - полное название месяца (October)
      // D - день месяца без ведущего нуля (15)
      // YYYY - год (2025)
      const formattedDate = newValue.format('MMMM D, YYYY');

      // Передаем отформатированную дату в родительский компонент
      setDateValue(formattedDate);
    } else {
      // Если пользователь очистил дату - передаем null
      setDateValue(null);
    }
  };

  // ============================================
  // JSX - ЧТО УВИДИТ ПОЛЬЗОВАТЕЛЬ
  // ============================================
  return (
    <div className="delivery-date-wrapper">
      <DatePicker
        // label - текст-подсказка, который видно когда поле пустое
        label="Delivery Date"
        // value - текущее значение даты
        // dayjs(dateValue) - преобразуем строку в формат dayjs, если дата есть
        // null - если даты нет
        value={dateValue ? dayjs(dateValue) : null}
        // format="LL" - формат отображения даты в поле
        // LL - стандартный формат: October 15, 2025
        format="LL"
        // onChange - вызывается при выборе даты
        onChange={handleDatePicker}
        // slotProps - настройка внешнего вида
        slotProps={{
          // textField - настройки поля ввода
          textField: {
            size: 'small', // маленький размер
            className: 'date-picker-field', // класс для CSS
          },
          // popper - настройки выпадающего окна календаря
          popper: {
            className: 'date-picker-popper', // класс для CSS
          },
        }}
        // views - что можно выбирать
        views={['day', 'month', 'year']} // день, месяц, год
        // slots - кастомные компоненты
        slots={{
          openPickerIcon: IconCalendar, // вместо стандартной иконки используем нашу
        }}
      />
    </div>
  );
};

export default DeliveryDate;
