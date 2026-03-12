// ============================================
// MAIN.JSX - ЭТО ГЛАВНЫЙ ВХОДНОЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

// Импортируем React - библиотеку для создания компонентов
// Без React нельзя использовать JSX синтаксис
import React from 'react';

// Импортируем ReactDOM - нужен, чтобы вставить React приложение в HTML страницу
// createRoot - новый способ в React 18 для рендеринга
import ReactDOM from 'react-dom/client';

// Импортируем BrowserRouter из React Router - для навигации по страницам
// Благодаря этому мы можем использовать Routes, Route, Link и т.д.
import { BrowserRouter } from 'react-router-dom';

// Импортируем Provider из React Redux - это связующее звено между Redux и React
// Provider делает store доступным для всех компонентов приложения
import { Provider } from 'react-redux';

// Импортируем PersistGate из Redux Persist - для загрузки сохраненных данных
// loading={null} - что показывать, пока данные загружаются (null = ничего)
// persistor - объект, который управляет сохранением данных
import { PersistGate } from 'redux-persist/integration/react';

// Импортируем store и persistor из нашего файла store.js
// store - главное хранилище данных (где лежит auth, token и т.д.)
// persistor - контроллер для сохранения данных в localStorage
import { store, persistor } from './redux/store';

// Импортируем главный компонент App
// Именно его мы будем вставлять в HTML
import App from './App';

// Импортируем глобальные стили CSS
import './index.css';

// Импортируем стили для react-toastify (всплывающие уведомления)
import 'react-toastify/dist/ReactToastify.css';

// ============================================
// ЗДЕСЬ ПРОИСХОДИТ ВОЛШЕБСТВО - ВСТАВЛЯЕМ REACT В HTML
// ============================================

// ReactDOM.createRoot() - создает корень React в HTML элементе с id="root"
// document.getElementById('root') - находим в index.html <div id="root"></div>
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> - строгий режим React
  // Помогает найти потенциальные проблемы в коде (дважды вызывает некоторые функции)
  <React.StrictMode>
    {/* ===== PROVIDER - подключаем Redux ко всему приложению ===== */}
    {/* Provider делает store доступным для всех компонентов через useDispatch и useSelector */}
    {/* Без Provider ни один компонент не сможет использовать Redux */}
    <Provider store={store}>
      {/* ===== PERSISTGATE - ждем загрузки сохраненных данных ===== */}
      {/* PersistGate загружает данные из localStorage (токен и т.д.) */}
      {/* Пока данные загружаются, показываем loading={null} (ничего) */}
      <PersistGate loading={null} persistor={persistor}>
        {/* ===== BROWSERROUTER - включаем навигацию по страницам ===== */}
        {/* BrowserRouter позволяет использовать Routes, Route, Link, Navigate */}
        {/* Без него react-router-dom не будет работать */}
        <BrowserRouter>
          {/* ===== APP - главный компонент нашего приложения ===== */}
          {/* Здесь уже будут все наши страницы: Login, Dashboard и т.д. */}
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
