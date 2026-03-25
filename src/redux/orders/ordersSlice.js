import { createSlice } from '@reduxjs/toolkit';
import { getOrders, getOrdersByQuery } from './operations';

const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getOrders.pending, state => {
        state.isLoading = true;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.isError = false;
      })

      .addCase(getOrders.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getOrdersByQuery.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrdersByQuery.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getOrdersByQuery.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
