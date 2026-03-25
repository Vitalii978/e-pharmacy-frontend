import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './SharedLayout.css';

const SharedLayout = () => {
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
    </LocalizationProvider>
  );
};

export default SharedLayout;
