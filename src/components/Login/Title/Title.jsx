// src/components/Login/Title/Title.jsx
import React from 'react';
import './Title.css';

// Импортируем изображения для разных устройств
import medicineMobile from '../../../assets/images/login/medicine-mobile.webp';
import medicineMobile1x from '../../../assets/images/login/medicine-mobile-1x.webp';
import medicineMobile2x from '../../../assets/images/login/medicine-mobile-2x.webp';
import medicineTablet from '../../../assets/images/login/medicine-tablet.webp';
import medicineTablet1x from '../../../assets/images/login/medicine-tablet-1x.webp';
import medicineTablet2x from '../../../assets/images/login/medicine-tablet-2x.webp';
import medicineDesktop from '../../../assets/images/login/medicine-desktop.webp';
import medicineDesktop1x from '../../../assets/images/login/medicine-desktop-1x.webp';
import medicineDesktop2x from '../../../assets/images/login/medicine-desktop-2x.webp';

const Title = () => {
  return (
    <div className="title-container">
      <h1 className="title-heading">
        Your medication, delivered.
        {/* <br /> */}
        Say goodbye to all <strong>your healthcare</strong> worries with us
        {/* <br /> */}
      </h1>

      <picture className="title-picture">
        {/* Для десктопа (1440px и выше) */}
        <source
          media="(min-width: 1440px)"
          srcSet={`${medicineDesktop} 1x, ${medicineDesktop1x} 2x, ${medicineDesktop2x} 3x`}
          type="image/webp"
        />

        {/* Для планшета (768px - 1439px) */}
        <source
          media="(min-width: 768px)"
          srcSet={`${medicineTablet} 1x, ${medicineTablet1x} 2x, ${medicineTablet2x} 3x`}
          type="image/webp"
        />

        {/* Для мобильных (до 768px) */}
        <source
          media="(max-width: 767.98px)"
          srcSet={`${medicineMobile} 1x, ${medicineMobile1x} 2x, ${medicineMobile2x} 3x`}
          type="image/webp"
        />

        {/* Запасной вариант */}
        <img src={medicineMobile} alt="Pill" className="medicine-image" />
      </picture>
    </div>
  );
};

export default Title;
