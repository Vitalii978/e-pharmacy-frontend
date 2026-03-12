// Импортируем axios для запросов на сервер
import axios from 'axios';
// Импортируем функцию создания асинхронных действий
import { createAsyncThunk } from '@reduxjs/toolkit';
// Импортируем тосты для уведомлений
import { toast } from 'react-toastify';

// Устанавливаем базовый URL для всех запросов
// import.meta.env.VITE_BASE_URL - это переменная из файла .env
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Вспомогательная функция: добавляет токен в заголовки всех запросов
const setAuthHeader = token => {
  // Теперь в каждом запросе будет заголовок: Authorization: Bearer токен
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Вспомогательная функция: убирает токен из заголовков
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// ===== ОПЕРАЦИЯ ЛОГИНА =====
// createAsyncThunk создает действие, которое может быть pending/fulfilled/rejected
export const logIn = createAsyncThunk(
  'auth/login', // имя действия
  async (credentials, thunkAPI) => {
    // credentials = { email, password }
    try {
      // Отправляем POST запрос на /api/user/login с email и password
      const res = await axios.post('/api/user/login', credentials);

      // Сохраняем токен в заголовки для будущих запросов
      setAuthHeader(res.data.token);

      // Показываем приветствие
      toast.success(`Welcome ${res.data.name}`);

      // Возвращаем данные (попадут в action.payload у fulfilled)
      return res.data; // { name, email, token }
    } catch (error) {
      // Если ошибка - показываем тост и возвращаем ошибку
      toast.error('ERROR, Invalid data');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ===== ОПЕРАЦИЯ ЛОГАУТА =====
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // Отправляем GET запрос на /api/user/logout
    await axios.get('api/user/logout');
    // Убираем токен из заголовков
    clearAuthHeader();
  } catch (error) {
    toast.error('Error, server not answer');
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ===== ОПЕРАЦИЯ ОБНОВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ =====
// Вызывается при перезагрузке страницы, чтобы восстановить сессию
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Получаем текущее состояние хранилища
    const state = thunkAPI.getState();
    // Берем токен из хранилища
    const persistedToken = state.auth.token;

    // Если токена нет - выходим
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // Устанавливаем токен в заголовки
      setAuthHeader(persistedToken);
      // Запрашиваем информацию о пользователе
      const res = await axios.get('api/user/user-info');
      return res.data; // { name, email }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Что здесь происходит:

// Это "курьеры", которые ходят на сервер

// Каждый курьер знает, куда идти (URL)

// Если курьер успешно сходил - приносит данные

// Если ошибка - приносит ошибку
