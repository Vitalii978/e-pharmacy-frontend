// ============================================
// customers/operations.js - ЗДЕСЬ МЫ ХОДИМ НА СЕРВЕР
// ============================================

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Функция для установки токена (чтобы сервер знал, что мы авторизованы)
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// createAsyncThunk - функция, которая создает "асинхронное действие"
// Первый параметр: 'customers/getAll' - уникальное имя действия
// Второй параметр: функция, которая выполняется
export const getCustomers = createAsyncThunk(
  'customers/getAll',
  async (_, thunkAPI) => {
    // thunkAPI.getState() - получаем всё хранилище Redux
    const state = thunkAPI.getState();

    // Достаем токен из auth (чтобы сервер знал, кто мы)
    const persistedToken = state.auth.token;

    // Если токена нет - возвращаем ошибку
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // Ставим токен в заголовки запроса
      setAuthHeader(persistedToken);

      // axios.get - отправляем GET запрос на сервер
      const res = await axios.get('/api/customers');

      // return res.data - возвращаем данные
      // Эти данные попадут в action.payload в slice
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Поиск клиентов - почти то же самое, но с параметром query
export const getCustomersByQuery = createAsyncThunk(
  'customers/getByQuery',
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // Добавляем query к URL: /api/customers?query=Иван
      const res = await axios.get(`/api/customers?query=${query}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
