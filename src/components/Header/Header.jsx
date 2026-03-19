// ============================================
// Header.jsx - ШАПКА САЙТА (КАК В ПРИМЕРЕ)
// ============================================

import React, { useState } from 'react';
//    useMediaQuery - хук для проверки размера экрана
import { useMediaQuery } from 'react-responsive';
import BurgerBtn from './BurgerBtn/BurgerBtn';
import LogoHeader from './LogoHeader/LogoHeader';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import LogoutBtn from './LogoutBtn/LogoutBtn';
import MobileMenu from '../MobileMenu/MobileMenu';
import './Header.css';

const Header = () => {
  // 3. Проверяем, десктоп ли это (ширина >= 1440px)
  //    isDesktop = true на десктопе, false на мобильных/планшетах
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  // 4. Состояние для мобильного меню
  //    isShowMobileMenu - открыто ли меню (true/false)
  //    setIsShowMobileMenu - функция для изменения состояния
  //    Начальное значение false - меню закрыто
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);

  return (
    <header className="header-main">
      {/* 6. header-box - контейнер для левой части (бургер + лого + заголовок) */}
      <div className="header-box">
        {/* 7. Кнопка-бургер (только на мобильных и планшетах) */}
        {/*    Передаем setIsShowMobileMenu, чтобы она могла открыть меню */}
        <BurgerBtn setIsShowMobileMenu={setIsShowMobileMenu} />

        {/* 8. Логотип (кликабельный - ведет на /dashboard) */}
        <LogoHeader />

        {/* 9. Заголовок с названием страницы и email пользователя */}
        <HeaderTitle />
      </div>

      {/* 10. Кнопка выхода - показываем только на десктопе */}
      {isDesktop && <LogoutBtn />}

      {/* 11. Мобильное меню - показываем если isShowMobileMenu = true */}
      {isShowMobileMenu && (
        <MobileMenu setIsShowMobileMenu={setIsShowMobileMenu} />
      )}
    </header>
  );
};

export default Header;
