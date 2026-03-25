import React from 'react';
import sprite from '../../../../../assets/sprite.svg';
import './IconCalendar.css';

const IconCalendar = () => {
  return (
    <svg width={18} height={18} className="calendar-icon">
      <use xlinkHref={`${sprite}#icon-calendar`} />
    </svg>
  );
};

export default IconCalendar;
