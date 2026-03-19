// // // ============================================
// // // SharedLayout.jsx - ОБЩАЯ ОБОЛОЧКА ДЛЯ ВСЕХ СТРАНИЦ
// // // ============================================

// // // Импортируем React
// // import React, { Suspense } from 'react';
// // // Импортируем Outlet из react-router-dom - это место, куда будут вставляться страницы
// // import { Outlet } from 'react-router-dom';
// // // Импортируем хук useMediaQuery для проверки размера экрана
// // import { useMediaQuery } from 'react-responsive';
// // // Импортируем ToastContainer для всплывающих уведомлений
// // import { ToastContainer } from 'react-toastify';
// // // Импортируем LocalizationProvider для календаря (MUI)
// // import { LocalizationProvider } from '@mui/x-date-pickers';
// // // Импортируем адаптер для работы с датами
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // // Импортируем компонент Header (шапку)
// // import Header from '../Header/Header';
// // // Импортируем компонент SideBar (боковое меню)
// // import SideBar from '../Sidebar/Sidebar';
// // // Импортируем стили
// // import './SharedLayout.css';

// // // ============================================
// // // ОСНОВНОЙ КОМПОНЕНТ
// // // ============================================
// // const SharedLayout = () => {
// //   // useMediaQuery проверяет, является ли экран десктопом (ширина >= 1440px)
// //   // isDesktop будет true на десктопе и false на мобильных/планшетах
// //   const isDesktop = useMediaQuery({ minWidth: 1440 });

// //   return (
// //     // LocalizationProvider нужен для работы DatePicker из MUI (календарь)
// //     <LocalizationProvider dateAdapter={AdapterDayjs}>
// //       {/* Шапка сайта - видна на всех страницах */}
// //       <Header />

// //       {/* Основной контент */}
// //       <main className="main-section">
// //         {/* На десктопе показываем Sidebar слева */}
// //         {isDesktop && <SideBar />}

// //         {/* Suspense - для ленивой загрузки страниц */}
// //         {/* fallback - что показывать, пока страница грузится */}
// //         <Suspense
// //           fallback={
// //             <div className="loading-div">
// //               <div className="loader">Загрузка...</div>
// //             </div>
// //           }
// //         >
// //           {/* Outlet - ЭТО САМОЕ ВАЖНОЕ */}
// //           {/* Сюда React Router будет вставлять текущую страницу */}
// //           {/* Например: DashboardPage, OrdersPage, ProductsPage и т.д. */}
// //           <Outlet />
// //         </Suspense>
// //       </main>

// //       {/* ToastContainer - для всплывающих уведомлений */}
// //       <ToastContainer />
// //     </LocalizationProvider>
// //   );
// // };

// // export default SharedLayout;

// // ============================================
// // SharedLayout.jsx - ОБЩАЯ ОБОЛОЧКА ДЛЯ ВСЕХ СТРАНИЦ
// // ============================================

// // ИМПОРТЫ
// import React from 'react';
// import { Outlet } from 'react-router-dom'; // Outlet - место, куда будут вставляться страницы
// import Header from '../Header/Header';
// import Sidebar from '../Sidebar/Sidebar';
// import './SharedLayout.css';

// // КОМПОНЕНТ
// const SharedLayout = () => {
//   return (
//     <div className="shared-layout">
//       {/* Шапка - видна на всех страницах */}
//       <Header />

//       <div className="layout-container">
//         {/* Боковое меню - видно на всех страницах */}
//         <Sidebar />

//         {/* Основной контент - меняется в зависимости от маршрута */}
//         <main className="layout-content">
//           {/* Outlet - сюда React Router вставляет текущую страницу */}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SharedLayout;

// ============================================
// SharedLayout.jsx - ОБЩАЯ ОБОЛОЧКА
// ============================================

import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './SharedLayout.css';

const SharedLayout = () => {
  // Только на десктопе (>=1440px) показываем Sidebar
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />
      <div className="layout">
        {isDesktop && <Sidebar />}
        <main
          className={`main-content ${isDesktop ? 'with-sidebar' : 'full-width'}`}
        >
          <Suspense fallback={<div className="loader">Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <ToastContainer />
    </LocalizationProvider>
  );
};

export default SharedLayout;
