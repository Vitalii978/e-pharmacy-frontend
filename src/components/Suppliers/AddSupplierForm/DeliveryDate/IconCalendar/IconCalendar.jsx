// ============================================
// IconCalendar.jsx - ИКОНКА КАЛЕНДАРЯ
// ============================================

// 1. ИМПОРТЫ
import React from 'react';

// sprite - файл со всеми иконками проекта
// Откуда: из папки assets
import sprite from '../../../../../assets/sprite.svg';

// Импортируем стили
import './IconCalendar.css';

// ============================================
// КОМПОНЕНТ IconCalendar
// ============================================
const IconCalendar = () => {
  return (
    // SVG - иконка
    // width/height - размер
    // className - класс для CSS
    <svg width={18} height={18} className="calendar-icon">
      {/* 
        use - берем иконку из спрайта
        xlinkHref - путь к иконке в спрайте
        sprite - это наш файл sprite.svg
        #icon-calendar - id иконки календаря внутри спрайта
      */}
      <use xlinkHref={`${sprite}#icon-calendar`} />
    </svg>
  );
};

export default IconCalendar;
