// ============================================
// Modal.jsx - УНИВЕРСАЛЬНОЕ МОДАЛЬНОЕ ОКНО
// ============================================

// 1. Импорты
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import sprite from '../../../assets/sprite.svg';
import './Modal.css';

// 2. КОМПОНЕНТ
//    children - то, что будет внутри модалки (форма, текст и т.д.)
//    fn - функция для закрытия (setShowModal, setIsEdit и т.д.)
const Modal = ({ children, fn }) => {
  // 3. Находим элемент, куда будем вставлять модалку
  const modalRoot = document?.getElementById('modal-root');

  // 4. Создаем ссылку на фон (нужно для определения клика по фону)
  const backdropRef = useRef(null);

  // 5. Функция для закрытия при клике на фон
  const handleBackdropClick = e => {
    // Если кликнули именно на фон, а не на содержимое
    if (e.target === backdropRef?.current) {
      fn && fn(false); // вызываем функцию закрытия
    }
  };

  // 6. Функция для закрытия по клику на крестик
  const handleCloseButtonClick = () => fn(false);

  // 7. createPortal - вставляет содержимое в другой элемент DOM
  return (
    <>
      {createPortal(
        // 7.1 Фон (полупрозрачный)
        <div
          className="modal-backdrop"
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          {/* 7.2 Контейнер модалки */}
          <div className="modal-container">
            {/* 7.3 Кнопка закрытия (крестик) */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseButtonClick}
            >
              <svg width={24} height={24}>
                <use xlinkHref={`${sprite}#icon-close`} />
              </svg>
            </button>
            {/* 7.4 Содержимое (форма, текст и т.д.) */}
            {children}
          </div>
        </div>,
        modalRoot // вставляем в элемент с id="modal-root"
      )}
    </>
  );
};

export default Modal;
