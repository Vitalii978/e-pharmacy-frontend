import React, { useState } from 'react';
import IconCalendar from './IconCalendar/IconCalendar';
import './DeliveryDate.css';

const DeliveryDate = ({ setDateValue, dateValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateValue || '');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = day => {
    const formattedDate = `${months[month]} ${day}, ${year}`;
    setSelectedDate(formattedDate);
    setDateValue(formattedDate);
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-empty" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = selectedDate === `${months[month]} ${d}, ${year}`;
      days.push(
        <div
          key={d}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(d)}
        >
          {d}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="delivery-date-wrapper">
      <div className="date-input-wrapper">
        <input
          type="text"
          placeholder="Delivery Date"
          value={selectedDate}
          readOnly
          className="date-input"
          onClick={() => setIsOpen(!isOpen)}
        />

        <button
          type="button"
          className="calendar-icon-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconCalendar />
        </button>
      </div>

      {isOpen && (
        <div className="calendar-dropdown">
          <div className="calendar-header">
            <button
              type="button"
              onClick={() => setYear(year - 1)}
              className="calendar-nav"
            >
              «
            </button>
            <select
              value={month}
              onChange={e => setMonth(parseInt(e.target.value))}
              className="calendar-month-select"
            >
              {months.map((m, idx) => (
                <option key={idx} value={idx}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={e => setYear(parseInt(e.target.value))}
              className="calendar-year-select"
            >
              {Array.from({ length: 10 }, (_, i) => year - 5 + i).map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setYear(year + 1)}
              className="calendar-nav"
            >
              »
            </button>
          </div>
          <div className="calendar-weekdays">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-days">{renderCalendar()}</div>
        </div>
      )}
    </div>
  );
};

export default DeliveryDate;
