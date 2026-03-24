// ============================================
// suppliers/operations.js - ЗАПРОСЫ К СЕРВЕРУ ДЛЯ ПОСТАВЩИКОВ
// ============================================

// 1. createAsyncThunk - функция для создания асинхронных действий
//    Откуда: из Redux Toolkit
//    Зачем: чтобы автоматически создавать pending, fulfilled, rejected
import { createAsyncThunk } from '@reduxjs/toolkit';

// 2. axios - библиотека для HTTP запросов
//    Откуда: установили через npm install axios
//    Зачем: чтобы отправлять запросы на сервер
import axios from 'axios';

// 3. toast - для всплывающих уведомлений
import { toast } from 'react-toastify';

// 4. Функция для установки токена в заголовки
//    Зачем: сервер проверяет, авторизован ли пользователь
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// ============================================
// 5. ОПЕРАЦИЯ: получить всех поставщиков
// ============================================
export const getSuppliers = createAsyncThunk(
  'suppliers/getAll', // уникальное имя действия (тип)
  async (_, thunkAPI) => {
    // thunkAPI.getState() - получаем всё состояние Redux
    const state = thunkAPI.getState();

    // Достаем токен из auth slice (хранилища авторизации)
    const persistedToken = state.auth.token;

    // Если токена нет - пользователь не авторизован
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // Устанавливаем токен в заголовки
      setAuthHeader(persistedToken);

      // Делаем GET запрос на сервер
      // /api/suppliers - эндпоинт из бекенда
      const res = await axios.get('/api/suppliers');

      // Возвращаем данные - они попадут в action.payload
      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 6. ОПЕРАЦИЯ: поиск поставщиков по имени
// ============================================
export const getSuppliersByQuery = createAsyncThunk(
  'suppliers/getByQuery',
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // Добавляем параметр query к URL: /api/suppliers?query=Иван
      const res = await axios.get(`/api/suppliers?query=${query}`);

      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 7. ОПЕРАЦИЯ: добавить нового поставщика
// ============================================
export const addSupplier = createAsyncThunk(
  'suppliers/add',
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // POST запрос с данными нового поставщика
      const res = await axios.post('/api/suppliers', data);

      toast.success('Supplier added successfully');
      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 8. ОПЕРАЦИЯ: редактировать поставщика
// ============================================
export const editSupplier = createAsyncThunk(
  'suppliers/edit',
  async ({ data, id }, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // PUT запрос с обновленными данными
      const res = await axios.put(`/api/suppliers/${id}`, data);

      toast.success('Supplier edited successfully');
      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
