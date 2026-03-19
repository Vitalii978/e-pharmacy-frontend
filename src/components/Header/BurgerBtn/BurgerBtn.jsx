// ============================================
// BurgerBtn.jsx - КНОПКА-БУРГЕР ДЛЯ МОБИЛЬНОГО МЕНЮ
// ============================================

// 1. Импортируем React - нужен для JSX
import React from 'react';

// 2. Импортируем спрайт с иконками (там лежит иконка бургера)
import sprite from '../../../assets/sprite.svg';

// 3. Импортируем CSS стили для этой кнопки
import './BurgerBtn.css';

// 4. КОМПОНЕНТ
//    Компонент принимает пропс setIsShowMobileMenu - функцию для открытия меню
const BurgerBtn = ({ setIsShowMobileMenu }) => {
  // 5. ФУНКЦИЯ-ОБРАБОТЧИК
  //    Эта функция будет вызвана при клике на кнопку
  const handleBurgerBtnClick = () => {
    // 6. Вызываем функцию из пропсов, передаем true (открыть меню)
    setIsShowMobileMenu(true);
  };

  // 7. JSX - ЧТО ПОКАЗЫВАЕМ
  return (
    <button
      type="button" // type="button" - чтобы не отправляла форму
      className="burger-btn" // класс для CSS стилей
      onClick={handleBurgerBtnClick} // при клике вызываем нашу функцию
    >
      <svg width={32} height={32}>
        {/* Иконка из спрайта с id="icon-burger" */}
        <use xlinkHref={`${sprite}#icon-burger`} />
      </svg>
    </button>
  );
};

// 8. ЭКСПОРТ - разрешаем использовать этот компонент в других файлах
export default BurgerBtn;

// // ============================================
// // MobileMenu.jsx - МОБИЛЬНОЕ МЕНЮ
// // ============================================

// // 1. ИМПОРТЫ
// import React from 'react';
// import { useMediaQuery } from 'react-responsive';
// import MobileModal from './MobileModal/MobileModal';
// import LogoutBtn from '../Header/LogoutBtn/LogoutBtn';
// import NavMenu from './NavMenu/NavMenu';

// // 2. КОМПОНЕНТ
// const MobileMenu = ({ setIsShowMobileMenu }) => {
//   // 3. Проверяем, мобильное устройство или планшет (меньше 1440px)
//   const isMobileTablet = useMediaQuery({ maxWidth: 1439.98 });

//   return (
//     <MobileModal setIsShowMobileMenu={setIsShowMobileMenu}>
//       {/* 4. Меню с иконками */}
//       <NavMenu />

//       {/* 5. На мобильных показываем кнопку выхода в меню */}
//       {isMobileTablet && <LogoutBtn />}
//     </MobileModal>
//   );
// };

// export default MobileMenu;
