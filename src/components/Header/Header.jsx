import React, { useState } from 'react'; // Импорт React и useState
import { useMediaQuery } from 'react-responsive'; // Хук для определения размера экрана
import BurgerBtn from './BurgerBtn/BurgerBtn'; // Импорт кнопки бургера
import LogoHeader from './LogoHeader/LogoHeader'; // Импорт логотипа
import HeaderTitle from './HeaderTitle/HeaderTitle'; // Импорт заголовков
import LogoutBtn from './LogoutBtn/LogoutBtn'; // Импорт кнопки выхода
// import MobileMenu from '../MobileMenu/MobileMenu'; // Импорт мобильного меню
import './Header.css'; // Импорт стилей

const Header = () => {
  // Компонент шапки
  const isDesktop = useMediaQuery({ minWidth: 1440 }); // Проверяем, десктоп ли (ширина >= 1440px)
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false); // Состояние: показывать мобильное меню или нет

  return (
    <header className="header">
      {' '}
      // Тег header
      <div className="header-container">
        {' '}
        // Контейнер для левой части
        <BurgerBtn setIsShowMobileMenu={setIsShowMobileMenu} /> // Кнопка
        бургера
        <LogoHeader /> // Логотип
        <HeaderTitle /> // Заголовки
      </div>
      {isDesktop && <LogoutBtn />} // Если десктоп, показываем кнопку выхода
      {/* {isShowMobileMenu && ( // Если надо показать мобильное меню
        <MobileMenu setIsShowMobileMenu={setIsShowMobileMenu} /> // Показываем мобильное меню
      )} */}
    </header>
  );
};

export default Header; // Экспорт компонента
