// ============================================
// operations.js - АСИНХРОННЫЕ ОПЕРАЦИИ ДЛЯ ЗАКАЗОВ
// ============================================

// 1. Импортируем createAsyncThunk - функцию для создания асинхронных действий
//    Она автоматически создает три действия: pending, fulfilled, rejected
import { createAsyncThunk } from '@reduxjs/toolkit';

// 2. Импортируем axios для запросов на сервер
import axios from 'axios';

// 3. Импортируем toast для уведомлений об ошибках
import { toast } from 'react-toastify';

// 4. Функция для установки токена в заголовки запросов
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// 5. СОЗДАЕМ АСИНХРОННОЕ ДЕЙСТВИЕ getOrders
//    Первый параметр: 'orders/getAll' - имя действия
//    Второй параметр: асинхронная функция, которая будет вызвана
export const getOrders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    // 6. Получаем состояние хранилища Redux
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

      // 10. Делаем GET запрос на сервер для получения заказов
      const res = await axios.get('/api/orders');

      // 11. Возвращаем данные (попадут в action.payload)
      return res.data;
    } catch (error) {
      // 12. В случае ошибки показываем уведомление
      toast.error('ERROR, Connection error');

      // 13. Возвращаем ошибку (попадет в action.error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 14. СОЗДАЕМ АСИНХРОННОЕ ДЕЙСТВИЕ getOrdersByQuery
//    Для поиска заказов по имени пользователя
export const getOrdersByQuery = createAsyncThunk(
  'orders/getByQuery',
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      // Добавляем параметр query к запросу
      const res = await axios.get(`/api/orders?query=${query}`);

      return res.data;
    } catch (error) {
      toast.error('ERROR, No orders found');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
