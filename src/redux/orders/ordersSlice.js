// ============================================
// ordersSlice.js - SLICE ДЛЯ ЗАКАЗОВ
// ============================================

// 1. Импортируем createSlice для создания редьюсера
import { createSlice } from '@reduxjs/toolkit';

// 2. Импортируем операции, которые будем обрабатывать
import { getOrders, getOrdersByQuery } from './operations';

// 3. НАЧАЛЬНОЕ СОСТОЯНИЕ
const initialState = {
  orders: [], // массив заказов
  isLoading: false, // флаг загрузки
  isError: false, // флаг ошибки
};

// 4. СОЗДАЕМ SLICE
const ordersSlice = createSlice({
  name: 'orders', // имя slice (должно совпадать с именем в store)
  initialState,
  reducers: {}, // обычные редьюсеры (пока не нужны)

  // 5. ОБРАБОТЧИКИ АСИНХРОННЫХ ДЕЙСТВИЙ
  extraReducers: builder => {
    builder
      // ===== getOrders =====
      // Когда началась загрузка
      .addCase(getOrders.pending, state => {
        state.isLoading = true;
      })
      // Когда данные успешно загружены
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload; // сохраняем заказы
        state.isLoading = false;
        state.isError = false;
      })
      // Когда произошла ошибка
      .addCase(getOrders.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      // ===== getOrdersByQuery =====
      .addCase(getOrdersByQuery.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrdersByQuery.fulfilled, (state, action) => {
        state.orders = action.payload; // сохраняем отфильтрованные заказы
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getOrdersByQuery.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// 6. ЭКСПОРТИРУЕМ REDUCER
export const ordersReducer = ordersSlice.reducer;
