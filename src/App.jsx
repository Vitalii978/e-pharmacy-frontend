// ============================================
// App.jsx - ГЛАВНЫЙ КОМПОНЕНТ С МАРШРУТАМИ
// ============================================

import React, { useEffect, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css'; // ← импортируем стили
import { ToastContainer } from 'react-toastify'; // ← импорт

// Ленивая загрузка страниц
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage')); // ← ДОБАВЛЯЕМ
// const SuppliersPage = lazy(() => import('./pages/SuppliersPage/SuppliersPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage/CustomersPage'));
const SharedLayout = lazy(
  () => import('./components/SharedLayout/SharedLayout')
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/dashboard">
              <LoginPage />
            </RestrictedRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login">
              <SharedLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />{' '}
          {/* ← ДОБАВЛЯЕМ */}
          <Route path="suppliers" element={<div>Suppliers Page</div>} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>
      </Routes>

      {/* ToastContainer - один для всего приложения */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
