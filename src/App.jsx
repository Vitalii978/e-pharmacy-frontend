// ============================================
// App.jsx - ГЛАВНЫЙ КОМПОНЕНТ С МАРШРУТАМИ
// ============================================

// ИМПОРТЫ
import React, { useEffect, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';

// Ленивая загрузка страниц
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const SharedLayout = lazy(
  () => import('./components/SharedLayout/SharedLayout')
);

// КОМПОНЕНТ
function App() {
  const dispatch = useDispatch();

  // При загрузке приложения пытаемся восстановить сессию
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* Страница логина - доступна только НЕавторизованным */}
      <Route
        path="/login"
        element={
          <RestrictedRoute redirectTo="/dashboard">
            <LoginPage />
          </RestrictedRoute>
        }
      />

      {/* Все защищенные страницы внутри SharedLayout */}
      <Route
        path="/"
        element={
          <PrivateRoute redirectTo="/login">
            <SharedLayout />
          </PrivateRoute>
        }
      >
        {/* Редирект с / на /dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Страница Dashboard */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Здесь будут другие страницы (пока заглушки) */}
        <Route path="orders" element={<div>Orders Page</div>} />
        <Route path="products" element={<div>Products Page</div>} />
        <Route path="suppliers" element={<div>Suppliers Page</div>} />
        <Route path="customers" element={<div>Customers Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
