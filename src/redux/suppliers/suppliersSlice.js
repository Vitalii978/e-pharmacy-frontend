// ============================================
// suppliersSlice.js - ХРАНИЛИЩЕ ДЛЯ ПОСТАВЩИКОВ
// ============================================

// 1. createSlice - функция для создания "кусочка" хранилища
import { createSlice } from '@reduxjs/toolkit';

// 2. Импортируем операции, которые будем обрабатывать
import {
  getSuppliers,
  getSuppliersByQuery,
  addSupplier,
  editSupplier,
} from './operations';

// 3. НАЧАЛЬНОЕ СОСТОЯНИЕ
//    Это то, что лежит на складе, когда страница только загрузилась
const initialState = {
  suppliers: [], // массив поставщиков (пустой сначала)
  isLoading: false, // флаг загрузки (пока не грузим)
  isError: false, // флаг ошибки (пока нет ошибки)
};

// 4. СОЗДАЕМ SLICE
const suppliersSlice = createSlice({
  name: 'suppliers', // имя этого кусочка хранилища
  initialState, // начальное состояние
  reducers: {}, // обычные действия (пока не нужны)

  // 5. ОБРАБОТЧИКИ АСИНХРОННЫХ ДЕЙСТВИЙ
  extraReducers: builder => {
    builder
      // ===== getSuppliers =====
      .addCase(getSuppliers.pending, state => {
        state.isLoading = true; // включаем лоадер
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload; // кладем поставщиков на полку
        state.isLoading = false; // выключаем лоадер
        state.isError = false; // ошибки нет
      })
      .addCase(getSuppliers.rejected, state => {
        state.isLoading = false; // выключаем лоадер
        state.isError = true; // включаем флаг ошибки
      })

      // ===== getSuppliersByQuery (поиск) =====
      .addCase(getSuppliersByQuery.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSuppliersByQuery.fulfilled, (state, action) => {
        state.suppliers = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getSuppliersByQuery.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      // ===== addSupplier (добавление) =====
      .addCase(addSupplier.pending, state => {
        state.isLoading = true;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        // Добавляем нового поставщика в начало массива
        state.suppliers = [action.payload, ...state.suppliers];
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addSupplier.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      // ===== editSupplier (редактирование) =====
      .addCase(editSupplier.pending, state => {
        state.isLoading = true;
      })
      .addCase(editSupplier.fulfilled, (state, action) => {
        // Заменяем отредактированного поставщика в массиве
        state.suppliers = state.suppliers.map(supplier =>
          supplier._id === action.payload._id ? action.payload : supplier
        );
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(editSupplier.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// 6. ЭКСПОРТИРУЕМ РЕДЬЮСЕР
export const suppliersReducer = suppliersSlice.reducer;
