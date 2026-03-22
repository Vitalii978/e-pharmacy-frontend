// ============================================
// products/operations.js - ЗАПРОСЫ ДЛЯ ПРОДУКТОВ
// ============================================

// 1. createAsyncThunk - функция из Redux Toolkit для создания асинхронных действий
//    Откуда взялась: из документации Redux Toolkit
//    Зачем: чтобы делать запросы на сервер и автоматически создавать pending/fulfilled/rejected
import { createAsyncThunk } from '@reduxjs/toolkit';

// 2. axios - библиотека для запросов на сервер
//    Откуда взялась: установили через npm install axios
//    Зачем: вместо встроенного fetch, потому что axios проще и имеет больше функций
import axios from 'axios';

// 3. toast - для всплывающих уведомлений
import { toast } from 'react-toastify';

// 4. Функция для установки токена - копируем из auth/operations.js
//    Зачем: чтобы каждый запрос отправлялся с токеном авторизации
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// 5. ПОЛУЧИТЬ ВСЕ ПРОДУКТЫ
//    createAsyncThunk создает действие, которое можно вызвать через dispatch
//    Первый параметр: 'products/getAll' - уникальное имя действия
//    Второй параметр: асинхронная функция, которая выполняется при вызове
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    // 6. thunkAPI.getState() - получаем всё состояние Redux
    //    Откуда взялось: из документации createAsyncThunk
    const state = thunkAPI.getState();

    // 7. Достаем токен из auth slice
    const persistedToken = state.auth.token;

    // 8. Если токена нет - возвращаем ошибку
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // 9. Устанавливаем токен в заголовки
      setAuthHeader(persistedToken);

      // 10. Делаем GET запрос на сервер
      //     /api/products - endpoint из бекенда
      const res = await axios.get('/api/products');
      // toast.success('Product added successfully'); // ← уведомление об успехе
      // 11. Возвращаем данные - они попадут в action.payload
      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 12. ПОИСК ПРОДУКТОВ ПО НАЗВАНИЮ
export const getProductsByQuery = createAsyncThunk(
  'products/getByQuery',
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // Добавляем параметр query к URL: /api/products?query=название
      const res = await axios.get(`/api/products?query=${query}`);

      // В примере возвращается res.data.products, смотрим структуру
      return res.data.products;
    } catch (error) {
      toast.error('ERROR, No products found');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 13. ДОБАВИТЬ НОВЫЙ ПРОДУКТ
export const addProduct = createAsyncThunk(
  'products/add',
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // POST запрос с данными нового продукта
      const res = await axios.post('/api/products', data);

      console.log('Продукт добавлен:', res.data); // ← для проверки

      toast.success('Product added successfully'); // ← уведомление об успехе
      return res.data;
    } catch (error) {
      console.log('Ошибка:', error); // ← для проверки
      toast.error('ERROR, Unable to add product');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 14. УДАЛИТЬ ПРОДУКТ
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // DELETE запрос с id продукта
      await axios.delete(`/api/products/${id}`);
      toast.success('Product deleted successfully'); // ← уведомление об успехе
      // Возвращаем id, чтобы удалить из хранилища
      return id;
    } catch (error) {
      toast.error('ERROR, Unable to delete product');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 15. РЕДАКТИРОВАТЬ ПРОДУКТ
export const editProduct = createAsyncThunk(
  'products/edit',
  async ({ data, id }, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // PUT запрос с обновленными данными
      const res = await axios.put(`/api/products/${id}`, data);
      toast.success('Product edited successfully'); // ← уведомление об успехе
      return res.data;
    } catch (error) {
      toast.error('ERROR, Unable to edit product');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
