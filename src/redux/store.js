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
    // другие редьюсеры добавим позже
  },
  // Настройка middleware (нужно для redux-persist)
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Временно для отладки - сделаем store глобальным
if (typeof window !== 'undefined') {
  window.store = store;
}

// Создаем persistor для сохранения состояния
export const persistor = persistStore(store);

// Что здесь происходит:

// Создаем главное хранилище

// Подключаем authReducer

// Настраиваем сохранение токена в localStorage (чтобы при перезагрузке не выкидывало)
