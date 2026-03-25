import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refreshUser } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isError: false,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(logIn.pending, state => {
        state.isLoading = true;
      })

      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
      })

      .addCase(logIn.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(logOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.user = { name: null, email: null };
        state.isError = false;
      })
      .addCase(logOut.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.isLoggedIn = true;
        state.isError = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isError = true;
      });
  },
});

export const authReducer = authSlice.reducer;
