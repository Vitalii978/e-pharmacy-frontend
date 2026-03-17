// ============================================
// suppliers/operations.js - ЗАПРОСЫ ДЛЯ ПОСТАВЩИКОВ
// ============================================

// 1. Импортируем createAsyncThunk - функцию для создания асинхронных действий
//    Она автоматически создает три действия: pending, fulfilled, rejected
import { createAsyncThunk } from '@reduxjs/toolkit';

// 2. Импортируем axios для запросов на сервер
import axios from 'axios';

// 3. Импортируем toast для уведомлений
import { toast } from 'react-toastify';

// 4. Функция для установки токена (копируем из других operations)
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// 5. ОПЕРАЦИЯ: получить всех поставщиков
//    Это нужно для выпадающего списка в форме добавления продукта
export const getSuppliers = createAsyncThunk(
  'suppliers/getAll', // имя действия
  async (_, thunkAPI) => {
    // Получаем токен из хранилища
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    // Если нет токена - ошибка
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // Устанавливаем токен
      setAuthHeader(persistedToken);

      // Делаем запрос на сервер
      const res = await axios.get('/api/suppliers');

      // Возвращаем данные
      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
