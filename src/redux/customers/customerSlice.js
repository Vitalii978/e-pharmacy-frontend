// ============================================
// customers/customerSlice.js - ЗДЕСЬ МЫ ХРАНИМ КЛИЕНТОВ
// ============================================

import { createSlice } from '@reduxjs/toolkit';
import { getCustomers, getCustomersByQuery } from './operations';

// initialState - что лежит на складе, когда страница только загрузилась
const initialState = {
  customers: [], // список клиентов (пустой)
  isLoading: false, // идет загрузка? (нет)
  isError: false, // есть ошибка? (нет)
};

const customerSlice = createSlice({
  name: 'customers', // имя этого ящика в хранилище
  initialState, // начальное состояние
  reducers: {}, // обычные действия (пока нет)

  // extraReducers - обрабатываем действия из operations.js
  extraReducers: builder => {
    builder
      // когда запрос НАЧАЛСЯ
      .addCase(getCustomers.pending, state => {
        state.isLoading = true; // включаем лоадер
      })

      // когда запрос УСПЕШНО ЗАВЕРШИЛСЯ
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload; // кладем клиентов
        state.isLoading = false; // выключаем лоадер
      })

      // когда запрос ПРОВАЛИЛСЯ
      .addCase(getCustomers.rejected, state => {
        state.isLoading = false; // выключаем лоадер
        state.isError = true; // показываем ошибку
      })

      // для поиска - то же самое
      .addCase(getCustomersByQuery.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.isLoading = false;
      });
  },
});

export const customerReducer = customerSlice.reducer;
