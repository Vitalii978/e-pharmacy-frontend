// // ✅ src/App.tsx - главный компонент с маршрутами

// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage/LoginPage';

// function App() {
//   return (
//     <Routes>
//       {/* когда пользователь заходит на главную страницу (/), показываем Login */}
//       <Route path="/" element={<LoginPage />} />
//       {/* когда пользователь заходит на /login, тоже показываем Login */}
//       <Route path="/login" element={<LoginPage />} />
//     </Routes>
//   );
// }

// export default App;

import React, { useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));

function App() {
  const dispatch = useDispatch();

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

      {/* Здесь будут защищенные маршруты */}
      <Route path="/" element={<div>Главная (заглушка)</div>} />
      <Route path="/dashboard" element={<div>Dashboard (заглушка)</div>} />
    </Routes>
  );
}

export default App;

// Объяснение:

// BrowserRouter - обертка, которая включает навигацию на сайте

// Routes - контейнер для всех маршрутов

// Route - один маршрут

// path="/" - адрес страницы (главная)

// element={<Login />} - какой компонент показывать

// Почему два Route с Login? Чтобы и на главной, и на /login была одна страница.
