import { createSlice } from '@reduxjs/toolkit';
import {
  getSuppliers,
  getSuppliersByQuery,
  addSupplier,
  editSupplier,
} from './operations';

const initialState = {
  suppliers: [],
  isLoading: false,
  isError: false,
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getSuppliers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getSuppliers.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

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

      .addCase(addSupplier.pending, state => {
        state.isLoading = true;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.suppliers = [action.payload, ...state.suppliers];
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addSupplier.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(editSupplier.pending, state => {
        state.isLoading = true;
      })
      .addCase(editSupplier.fulfilled, (state, action) => {
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

export const suppliersReducer = suppliersSlice.reducer;
