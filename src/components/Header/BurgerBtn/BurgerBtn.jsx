import React from 'react';
import sprite from '../../../assets/sprite.svg';
import './BurgerBtn.css';

const BurgerBtn = ({ setIsShowMobileMenu }) => {
  const handleBurgerBtnClick = () => {
    setIsShowMobileMenu(true);
  };

  return (
    <button type="button" className="burger-btn" onClick={handleBurgerBtnClick}>
      <svg width={32} height={32}>
        <use xlinkHref={`${sprite}#icon-burger`} />
      </svg>
    </button>
  );
};

export default BurgerBtn;
