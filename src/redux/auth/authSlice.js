// Импортируем функцию создания "кусочка" хранилища из Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Импортируем операции (логин, логаут, обновление), которые будем обрабатывать
import { logIn, logOut, refreshUser } from './operations';

// Начальное состояние (что лежит в хранилище, когда сайт только загрузился)
const initialState = {
  user: { name: null, email: null }, // пользователь: имя и email (пока пусто)
  token: null, // токен (пропуск) - пока пусто
  isError: false, // была ли ошибка? пока нет
  isLoggedIn: false, // залогинен ли пользователь? пока нет
  isLoading: false, // идет ли загрузка? пока нет
  isRefreshing: false, // обновляется ли пользователь? пока нет
};

// Создаем "slice" - кусочек хранилища для авторизации
const authSlice = createSlice({
  name: 'auth', // имя этого кусочка
  initialState, // начальное состояние
  reducers: {}, // обычные действия (пока нет)

  // extraReducers - обрабатываем действия, которые приходят из operations.js
  extraReducers: builder => {
    builder
      // ===== ЛОГИН =====
      // Когда начался процесс логина
      .addCase(logIn.pending, state => {
        state.isLoading = true; // включаем лоадер
      })

      // Когда логин успешно завершился
      .addCase(logIn.fulfilled, (state, action) => {
        // action.payload - это данные, которые вернул сервер
        state.token = action.payload.token; // сохраняем токен
        state.isLoggedIn = true; // пользователь залогинен
        state.isLoading = false; // выключаем лоадер
        state.isError = false; // ошибки нет
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        }; // сохраняем данные пользователя
      })

      // Когда логин провалился
      .addCase(logIn.rejected, state => {
        state.isLoading = false; // выключаем лоадер
        state.isError = true; // показываем ошибку
      })

      // ===== ЛОГАУТ =====
      .addCase(logOut.pending, state => {
        state.isLoading = true; // включаем лоадер
      })
      .addCase(logOut.fulfilled, state => {
        state.token = null; // удаляем токен
        state.isLoggedIn = false; // пользователь вышел
        state.isLoading = false; // выключаем лоадер
        state.user = { name: null, email: null }; // очищаем данные
        state.isError = false; // ошибки нет
      })
      .addCase(logOut.rejected, state => {
        state.isLoading = false; // выключаем лоадер
        state.isError = true; // показываем ошибку
      })

      // ===== ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ (при перезагрузке) =====
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true; // идет обновление
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false; // обновление закончено
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        }; // сохраняем данные
        state.isLoggedIn = true; // пользователь залогинен
        state.isError = false; // ошибки нет
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false; // обновление закончено
        state.isError = true; // ошибка
      });
  },
});

// Экспортируем reducer, чтобы подключить в store
export const authReducer = authSlice.reducer;

// Что здесь происходит:

// Мы создаем "ящик" с именем auth

// В ящике лежат: user, token, isLoggedIn и т.д.

// Мы говорим: "Когда придет действие logIn.fulfilled - положи в ящик токен и данные"

// Когда придет logOut.fulfilled - выкинь всё из ящика
