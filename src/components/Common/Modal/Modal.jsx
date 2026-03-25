import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import sprite from '../../../assets/sprite.svg';
import './Modal.css';

const Modal = ({ children, fn }) => {
  const modalRoot = document?.getElementById('modal-root');

  const backdropRef = useRef(null);

  const handleBackdropClick = e => {
    if (e.target === backdropRef?.current) {
      fn && fn(false);
    }
  };

  const handleCloseButtonClick = () => fn(false);

  return (
    <>
      {createPortal(
        <div
          className="modal-backdrop"
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          <div className="modal-container">
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseButtonClick}
            >
              <svg width={24} height={24}>
                <use xlinkHref={`${sprite}#icon-close`} />
              </svg>
            </button>

            {children}
          </div>
        </div>,
        modalRoot
      )}
    </>
  );
};

export default Modal;
