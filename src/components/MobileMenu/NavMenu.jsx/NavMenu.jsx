// // ============================================
// // NavMenu.jsx - МЕНЮ С ИКОНКАМИ (ИСПОЛЬЗУЕТСЯ И В SIDEBAR, И В МОБИЛЬНОМ МЕНЮ)
// // ============================================

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import sprite from '../../../assets/sprite.svg';
// import { menuInfo } from '../../../lib/menu';
// import './NavMenu.css';

// const NavMenu = () => {
//   return (
//     <ul className="nav-menu-list">
//       {/* Проходим по массиву menuInfo и создаем пункты меню */}
//       {menuInfo?.map((item, index) => (
//         <li key={index} className="nav-menu-item">
//           {/* NavLink - специальная ссылка из react-router-dom */}
//           {/* Она автоматически добавляет класс "active" на текущей странице */}
//           <NavLink to={item.to} className="nav-menu-link">
//             <svg width={14} height={14}>
//               {/* Используем иконку из спрайта по id */}
//               <use xlinkHref={`${sprite}#${item.icon}`} />
//             </svg>
//           </NavLink>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default NavMenu;
