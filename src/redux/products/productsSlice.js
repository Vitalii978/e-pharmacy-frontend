// ============================================
// productsSlice.js - ХРАНИЛИЩЕ ДЛЯ ПРОДУКТОВ
// ============================================

// 1. createSlice - функция для создания редьюсера
//    Откуда: из Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// 2. Импортируем все операции с продуктами
import {
  getProducts,
  getProductsByQuery,
  addProduct,
  deleteProduct,
  editProduct,
} from './operations';

// 3. Начальное состояние хранилища
const initialState = {
  products: [], // массив продуктов
  categories: [], // массив категорий (из примера)
  isLoading: false, // флаг загрузки
  isError: false, // флаг ошибки
};

// 4. Создаем slice
const productsSlice = createSlice({
  name: 'products', // имя slice (важно для селекторов)
  initialState,
  reducers: {}, // обычные действия (пока не нужны)

  // 5. extraReducers - обрабатываем асинхронные действия
  extraReducers: builder => {
    builder
      // ===== getProducts =====
      .addCase(getProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        // action.payload - данные из operations.js
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProducts.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      // ===== getProductsByQuery =====
      .addCase(getProductsByQuery.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProductsByQuery.fulfilled, (state, action) => {
        state.products = action.payload; // отфильтрованные продукты
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProductsByQuery.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      // ===== addProduct =====
      .addCase(addProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        // Добавляем новый продукт в массив
        state.products = [...state.products, action.payload];
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addProduct.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      // ===== deleteProduct =====
      .addCase(deleteProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // action.payload - id удаленного продукта
        state.products = state.products.filter(
          product => product._id !== action.payload
        );
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteProduct.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      // ===== editProduct =====
      .addCase(editProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        // Заменяем отредактированный продукт
        state.products = state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        );
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(editProduct.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// 6. Экспортируем редьюсер
export const productsReducer = productsSlice.reducer;
