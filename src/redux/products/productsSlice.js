import { createSlice } from '@reduxjs/toolkit';
import {
  getProducts,
  getProductsByQuery,
  addProduct,
  deleteProduct,
  editProduct,
} from './operations';

const initialState = {
  products: [],
  categories: [],
  isLoading: false,
  isError: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProducts.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getProductsByQuery.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProductsByQuery.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProductsByQuery.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(addProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload];
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addProduct.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
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

      .addCase(editProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
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

export const productsReducer = productsSlice.reducer;
