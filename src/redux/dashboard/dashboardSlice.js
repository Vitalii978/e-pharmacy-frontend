import { createSlice } from '@reduxjs/toolkit';
import { getDashboardInfo } from './operations';

const initialState = {
  recentCustomers: [],
  incomeExpenses: [],
  allCustomers: null,
  allProducts: null,
  allSuppliers: null,
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getDashboardInfo.pending, state => {
        state.isLoading = true;
      })

      .addCase(getDashboardInfo.fulfilled, (state, action) => {
        state.recentCustomers = action.payload.customers;
        state.incomeExpenses = action.payload.dashboard;
        state.allCustomers = action.payload.customersCount;
        state.allProducts = action.payload.productsCount;
        state.allSuppliers = action.payload.suppliersCount;
        state.isLoading = false;
      })

      .addCase(getDashboardInfo.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
