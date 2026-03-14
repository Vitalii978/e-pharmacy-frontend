// ============================================
// dashboardSlice.js - SLICE ДЛЯ ДАШБОРДА
// ============================================

import { createSlice } from '@reduxjs/toolkit';
import { getDashboardInfo } from './operations';

// НАЧАЛЬНОЕ СОСТОЯНИЕ
const initialState = {
  recentCustomers: [], // список последних клиентов
  incomeExpenses: [], // список доходов/расходов
  allCustomers: null, // количество всех клиентов
  allProducts: null, // количество всех продуктов
  allSuppliers: null, // количество всех поставщиков
  isLoading: false, // флаг загрузки
};

// СОЗДАЕМ SLICE
const dashboardSlice = createSlice({
  name: 'dashboard', // имя slice (важно! должно совпадать с именем в store)
  initialState,
  reducers: {}, // обычные редьюсеры (пока не нужны)

  // ОБРАБОТЧИКИ АСИНХРОННЫХ ДЕЙСТВИЙ
  extraReducers: builder => {
    builder
      // Когда началась загрузка
      .addCase(getDashboardInfo.pending, state => {
        state.isLoading = true;
      })

      // Когда данные успешно загружены
      .addCase(getDashboardInfo.fulfilled, (state, action) => {
        // action.payload - данные из operations.js
        state.recentCustomers = action.payload.customers;
        state.incomeExpenses = action.payload.dashboard;
        state.allCustomers = action.payload.customersCount;
        state.allProducts = action.payload.productsCount;
        state.allSuppliers = action.payload.suppliersCount;
        state.isLoading = false;
      })

      // Когда произошла ошибка
      .addCase(getDashboardInfo.rejected, state => {
        state.isLoading = false;
      });
  },
});

// ЭКСПОРТИРУЕМ REDUCER
export const dashboardReducer = dashboardSlice.reducer;
