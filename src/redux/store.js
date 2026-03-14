import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { dashboardReducer } from './dashboard/dashboardSlice'; // ← ДОБАВЬ ЭТОТ ИМПОРТ

// Настройка сохранения токена в localStorage
const authPersistConfig = {
  key: 'auth', // ключ в localStorage
  storage, // использовать localStorage
  whitelist: ['token'], // сохранять только token
};

// Создаем хранилище
export const store = configureStore({
  reducer: {
    // auth: применяем persistReducer чтобы токен сохранялся
    auth: persistReducer(authPersistConfig, authReducer),
    // dashboard slice - БЕЗ сохранения (данные всегда свежие с сервера)
    dashboard: dashboardReducer, // ← ДОБАВЬ ЭТУ СТРОКУ
  },
  // Настройка middleware (нужно для redux-persist)
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Создаем persistor для сохранения состояния
export const persistor = persistStore(store);

// Что здесь происходит:

// Создаем главное хранилище

// Подключаем authReducer

// Настраиваем сохранение токена в localStorage (чтобы при перезагрузке не выкидывало)

// ============================================
// ВРЕМЕННО - ДЛЯ ОТЛАДКИ В КОНСОЛИ
// ============================================
if (typeof window !== 'undefined') {
  window.store = store; // ← ДЕЛАЕМ STORE ГЛОБАЛЬНЫМ
}
