import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import sprite from '../../../assets/sprite.svg';
import './MobileModal.css';

const MobileModal = ({ children, setIsShowMobileMenu }) => {
  const modalRoot = document?.getElementById('modal-root');
  const backdropRef = useRef(null);

  const handleBackdropClick = e => {
    if (e.target === backdropRef?.current) {
      setIsShowMobileMenu(false);
    }
  };

  const handleCloseButtonClick = () => setIsShowMobileMenu(false);

  return (
    <>
      {createPortal(
        <div
          className="mobile-backdrop"
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          <div className="mobile-container">
            <button
              type="button"
              className="mobile-close-btn"
              onClick={handleCloseButtonClick}
            >
              <svg width={32} height={32}>
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

export default MobileModal;
