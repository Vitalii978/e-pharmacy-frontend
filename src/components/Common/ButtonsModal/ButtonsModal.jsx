// ============================================
// ButtonsModal.jsx - КНОПКИ ДЛЯ МОДАЛЬНЫХ ОКОН
// ============================================

import React from 'react';
import './ButtonsModal.css';

// Компонент принимает:
// title - текст на кнопке подтверждения (Save, Add и т.д.)
// cancelAction - функция для отмены (закрытия модалки)
const ButtonsModal = ({ title, cancelAction }) => {
  return (
    <div className="modal-buttons">
      {/* Кнопка подтверждения (Save/Add) */}
      <button type="submit" className="modal-btn confirm-btn">
        {title}
      </button>

      {/* Кнопка отмены (Cancel) */}
      <button
        type="button"
        className="modal-btn cancel-btn"
        onClick={() => cancelAction(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default ButtonsModal;
