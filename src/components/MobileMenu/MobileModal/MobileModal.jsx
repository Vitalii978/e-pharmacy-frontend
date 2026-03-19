// import React, { useRef } from 'react';
// import { createPortal } from 'react-dom';
// import sprite from '../../../assets/sprite.svg';
// import './MobileModal.css';

// const MobileModal = ({ children, setIsShowMobileMenu }) => {
//   const modalRoot = document?.getElementById('modal-root');
//   const backdropRef = useRef(null);

//   const handleBackdropClick = e => {
//     if (e.target === backdropRef?.current) {
//       setIsShowMobileMenu && setIsShowMobileMenu(false);
//     }
//   };

//   const handleCloseButtonClick = () => setIsShowMobileMenu(false);

//   return (
//     <>
//       {createPortal(
//         <div
//           className="mobile-backdrop"
//           ref={backdropRef}
//           onClick={handleBackdropClick}
//         >
//           <div className="mobile-modal-container">
//             <button
//               type="button"
//               className="mobile-close-btn"
//               onClick={handleCloseButtonClick}
//             >
//               <svg>
//                 <use xlinkHref={`${sprite}#icon-close`} />
//               </svg>
//             </button>
//             {children}
//           </div>
//         </div>,
//         modalRoot
//       )}
//     </>
//   );
// };

// export default MobileModal;

// ============================================
// MobileModal.jsx - МОДАЛЬНОЕ ОКНО ДЛЯ МОБИЛЬНОГО МЕНЮ
// ============================================

// 1. ИМПОРТЫ
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import sprite from '../../../assets/sprite.svg';
import './MobileModal.css';

// 2. КОМПОНЕНТ
//    children - содержимое (NavMenu)
//    setIsShowMobileMenu - функция для закрытия
const MobileModal = ({ children, setIsShowMobileMenu }) => {
  // 3. Находим элемент для портала
  const modalRoot = document?.getElementById('modal-root');

  // 4. Ссылка на фон
  const backdropRef = useRef(null);

  // 5. Закрытие при клике на фон
  const handleBackdropClick = e => {
    if (e.target === backdropRef?.current) {
      setIsShowMobileMenu(false);
    }
  };

  // 6. Закрытие по крестику
  const handleCloseButtonClick = () => setIsShowMobileMenu(false);

  return (
    <>
      {createPortal(
        // 7. Полупрозрачный фон
        <div
          className="mobile-backdrop"
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          {/* 8. Контейнер меню */}
          <div className="mobile-container">
            {/* 9. Кнопка закрытия */}
            <button
              type="button"
              className="mobile-close-btn"
              onClick={handleCloseButtonClick}
            >
              <svg width={32} height={32}>
                <use xlinkHref={`${sprite}#icon-close`} />
              </svg>
            </button>
            {/* 10. Содержимое (NavMenu) */}
            {children}
          </div>
        </div>,
        modalRoot
      )}
    </>
  );
};

export default MobileModal;
