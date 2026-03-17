// ============================================
// suppliersSlice.js - ХРАНИЛИЩЕ ДЛЯ ПОСТАВЩИКОВ
// ============================================

import { createSlice } from '@reduxjs/toolkit';
import { getSuppliers } from './operations';

// Начальное состояние
const initialState = {
  suppliers: [], // массив поставщиков
  isLoading: false, // флаг загрузки
  isError: false, // флаг ошибки
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Когда началась загрузка
      .addCase(getSuppliers.pending, state => {
        state.isLoading = true;
      })
      // Когда данные успешно загружены
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload; // сохраняем поставщиков
        state.isLoading = false;
        state.isError = false;
      })
      // Когда ошибка
      .addCase(getSuppliers.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const suppliersReducer = suppliersSlice.reducer;
