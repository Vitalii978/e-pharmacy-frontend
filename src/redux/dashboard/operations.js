// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// // В Vite используем import.meta.env вместо process.env
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// // Функция для установки токена
// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const getDashboardInfo = createAsyncThunk(
//   'dashboard/getInfo',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;

//     if (persistedToken === null) {
//       return thunkAPI.rejectWithValue('Unable to fetch user');
//     }

//     try {
//       setAuthHeader(persistedToken);
//       const res = await axios.get('/api/dashboard');
//       return res.data;
//     } catch (error) {
//       toast.error('ERROR, Invalid data');
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

// ============================================
// operations.js - АСИНХРОННЫЕ ОПЕРАЦИИ ДЛЯ ДАШБОРДА
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

// 5. СОЗДАЕМ АСИНХРОННОЕ ДЕЙСТВИЕ getDashboardInfo
//    Первый параметр: 'dashboard/getInfo' - имя действия
//    Второй параметр: асинхронная функция, которая будет вызвана
export const getDashboardInfo = createAsyncThunk(
  'dashboard/getInfo',
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

      // 10. Делаем GET запрос на сервер
      const res = await axios.get('/api/dashboard');

      // 11. Возвращаем данные (попадут в action.payload)
      return res.data;
    } catch (error) {
      // 12. В случае ошибки показываем уведомление
      toast.error('ERROR, Invalid data');

      // 13. Возвращаем ошибку (попадет в action.error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
