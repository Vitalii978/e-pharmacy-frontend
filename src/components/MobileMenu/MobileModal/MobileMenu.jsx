// ============================================
// MobileMenu.jsx - МОБИЛЬНОЕ МЕНЮ (ПОЯВЛЯЕТСЯ ПРИ КЛИКЕ НА БУРГЕР)
// ============================================

import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileModal from './MobileModal/MobileModal';
import LogoutBtn from '../Header/LogoutBtn/LogoutBtn';
import NavMenu from './NavMenu/NavMenu';

const MobileMenu = ({ setIsShowMobileMenu }) => {
  // Проверяем, мобильное устройство или планшет (меньше 1440px)
  const isMobileTablet = useMediaQuery({ maxWidth: 1439 });

  return (
    // MobileModal - это модальное окно, которое закрывается по клику на фон или крестик
    <MobileModal setIsShowMobileMenu={setIsShowMobileMenu}>
      {/* Меню с иконками */}
      <NavMenu />

      {/* На мобильных и планшетах показываем кнопку выхода в меню */}
      {isMobileTablet && <LogoutBtn />}
    </MobileModal>
  );
};

export default MobileMenu;
