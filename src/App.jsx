// // src/App.js
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage/LoginPage';
// import './App.css';

// function App() {
//   // Проверяем, авторизован ли пользователь (есть ли токен)
//   const isAuthenticated = !!localStorage.getItem('token');

//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={
//           isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
//         }
//       />
//       <Route path="/" element={<Navigate to="/login" replace />} />
//       {/* Временно, потом добавим защищенные маршруты */}
//       <Route
//         path="/dashboard"
//         element={
//           isAuthenticated ? (
//             <div>Dashboard (защищенная страница)</div>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

// ✅ src/App.tsx - главный компонент с маршрутами

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
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
