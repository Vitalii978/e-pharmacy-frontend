// // // ============================================
// // // Sidebar.jsx - БОКОВОЕ МЕНЮ (ДЕСКТОП)
// // // ============================================

// // import React from 'react';
// // import NavMenu from '../MobileMenu/NavMenu.jsx/NavMenu';
// // import './Sidebar.css';

// // const SideBar = () => {
// //   return (
// //     <aside className="sidebar">
// //       {/* Меню с иконками (то же самое, что и в мобильном меню) */}
// //       <NavMenu />
// //     </aside>
// //   );
// // };

// // export default SideBar;

// // ============================================
// // Sidebar.jsx - БОКОВОЕ МЕНЮ
// // ============================================

// // ИМПОРТЫ
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import sprite from '../../assets/sprite.svg';
// import './Sidebar.css';

// // КОМПОНЕНТ
// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <nav className="sidebar-nav">
//         {/* Ссылка на Dashboard */}
//         <NavLink to="/dashboard" className="sidebar-link">
//           <svg width={20} height={20}>
//             <use xlinkHref={`${sprite}#icon-dashboard`} />
//           </svg>
//         </NavLink>

//         {/* Ссылка на Orders */}
//         <NavLink to="/orders" className="sidebar-link">
//           <svg width={20} height={20}>
//             <use xlinkHref={`${sprite}#icon-shopping-cart`} />
//           </svg>
//         </NavLink>

//         {/* Ссылка на Products */}
//         <NavLink to="/products" className="sidebar-link">
//           <svg width={20} height={20}>
//             <use xlinkHref={`${sprite}#icon-flask-fill`} />
//           </svg>
//         </NavLink>

//         {/* Ссылка на Suppliers */}
//         <NavLink to="/suppliers" className="sidebar-link">
//           <svg width={20} height={20}>
//             <use xlinkHref={`${sprite}#icon-pharmacy`} />
//           </svg>
//         </NavLink>

//         {/* Ссылка на Customers */}
//         <NavLink to="/customers" className="sidebar-link">
//           <svg width={20} height={20}>
//             <use xlinkHref={`${sprite}#icon-users`} />
//           </svg>
//         </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

// ============================================
// Sidebar.jsx - БОКОВОЕ МЕНЮ ДЛЯ ДЕСКТОПА
// ============================================

import React from 'react';
import NavMenu from '../MobileMenu/NavMenu/NavMenu';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <NavMenu />
    </aside>
  );
};

export default Sidebar;
