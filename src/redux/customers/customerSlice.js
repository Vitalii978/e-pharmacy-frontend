import { createSlice } from '@reduxjs/toolkit';
import { getCustomers, getCustomersByQuery } from './operations';

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getCustomers.pending, state => {
        state.isLoading = true;
      })

      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.isLoading = false;
      })

      .addCase(getCustomers.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getCustomersByQuery.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.isLoading = false;
      });
  },
});

export const customerReducer = customerSlice.reducer;
