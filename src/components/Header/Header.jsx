import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import BurgerBtn from './BurgerBtn/BurgerBtn';
import LogoHeader from './LogoHeader/LogoHeader';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import LogoutBtn from './LogoutBtn/LogoutBtn';
import MobileMenu from '../MobileMenu/MobileMenu';
import './Header.css';

const Header = () => {
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);

  return (
    <header className="header-main">
      <div className="header-box">
        <BurgerBtn setIsShowMobileMenu={setIsShowMobileMenu} />
        <LogoHeader />
        <HeaderTitle />
      </div>
      {isDesktop && <LogoutBtn />}
      {isShowMobileMenu && (
        <MobileMenu setIsShowMobileMenu={setIsShowMobileMenu} />
      )}
    </header>
  );
};

export default Header;
