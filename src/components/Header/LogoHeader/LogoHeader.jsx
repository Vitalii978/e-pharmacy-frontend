// import React from 'react'; // Импорт React
// import { Link } from 'react-router-dom'; // Link для навигации
// import './LogoHeader.css'; // Импорт стилей

// // Импорт изображений логотипа для разных разрешений
// import logo from '../../../assets/images/logo/logo.webp'; // Обычная версия (1x)
// import logo2x from '../../../assets/images/logo/logo-2x.webp'; // Для Retina (2x)
// import logo3x from '../../../assets/images/logo/logo-3x.webp'; // Для Super Retina (3x)

// const LogoHeader = () => {
//   // Компонент логотипа в шапке
//   return (
//     <Link to="/dashboard" className="logo-header-link">
//       {'// При клике переходим на Dashboard '}

//       <picture>
//         {'// Для выбора правильной картинки '}
//         <source
//           srcSet={`${logo} 1x, ${logo2x} 2x, ${logo3x} 3x`} // Версии для разной плотности
//           type="image/webp" // Тип WebP
//         />
//         <img
//           src={logo} // Обычная версия
//           alt="Logo" // Альтернативный текст
//           className="logo-header-image" // Класс для стилей
//         />
//       </picture>
//     </Link>
//   );
// };

// export default LogoHeader; // Экспорт компонента

import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo/logo.webp';
import logo1x from '../../../assets/images/logo/logo-1x.webp';
import logo2x from '../../../assets/images/logo/logo-2x.webp';
import './LogoHeader.css';

const LogoHeader = () => {
  return (
    //    Link - вместо обычного <a>, чтобы не перезагружать страницу
    //    to="/dashboard" - при клике переходим на главную страницу админки
    <Link to="/dashboard" className="logo-header-link">
      {/* 4. picture - тег для адаптивных изображений */}
      {/*    Позволяет подставлять разные картинки для разных экранов */}
      <picture>
        {/* 5. source - указывает, какие картинки для каких случаев */}
        {/*    srcSet - набор картинок с указанием плотности пикселей */}
        {/*    1x - обычные экраны, 2x - Retina, 3x - сверхчеткие */}
        <source srcSet={`${logo} 1x, ${logo1x} 2x, ${logo2x} 3x`} />

        {/* 6. img - запасной вариант, если picture не работает */}
        {/*    src - обычная картинка */}
        {/*    alt - описание для скринридеров и на случай если картинка не загрузилась */}
        <img src={logo} alt="Logo" />
      </picture>
    </Link>
  );
};

export default LogoHeader; // ← ЭТО ОБЯЗАТЕЛЬНО
