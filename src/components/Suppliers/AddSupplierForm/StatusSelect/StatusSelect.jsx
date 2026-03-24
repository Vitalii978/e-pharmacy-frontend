// ============================================
// StatusSelect.jsx - КОМПОНЕНТ СЕЛЕКТА СТАТУСА
// =============================================

import React, { useState, useRef, useEffect } from 'react';
import sprite from '../../../../assets/sprite.svg';
import './StatusSelect.css';

const StatusSelect = ({ statusValue, setStatusValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const options = ['Active', 'Deactive'];

  const handleSelect = value => {
    setStatusValue(value);
    setIsOpen(false);
  };

  const handleClear = e => {
    e.stopPropagation();
    setStatusValue(null);
  };

  // Закрываем список при клике ВНЕ компонента (любое место вне status-select-wrapper)
  useEffect(() => {
    const handleClickOutside = event => {
      // Если кликнули не внутри wrapperRef - закрываем список
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Добавляем слушатель на весь документ
    document.addEventListener('mousedown', handleClickOutside);

    // При размонтировании удаляем слушатель
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="status-select-wrapper" ref={wrapperRef}>
      <div
        className={`status-select-trigger ${statusValue ? 'has-value' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="status-select-value">{statusValue || 'Status'}</span>

        {statusValue && (
          <button
            type="button"
            className="status-clear-btn"
            onClick={handleClear}
          >
            <svg width={32} height={32}>
              <use xlinkHref={`${sprite}#icon-close`} />
            </svg>
          </button>
        )}

        <svg width={14} height={14} className="status-arrow">
          <use xlinkHref={`${sprite}#icon-icon-chevron-down`} />
        </svg>
      </div>

      {isOpen && (
        <div className="status-select-dropdown">
          {options.map(opt => (
            <div
              key={opt}
              className={`status-option ${statusValue === opt ? 'selected' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusSelect;
