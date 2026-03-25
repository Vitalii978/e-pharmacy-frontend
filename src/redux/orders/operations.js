import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const getOrders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/api/orders');
      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOrdersByQuery = createAsyncThunk(
  'orders/getByQuery',
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get(`/api/orders?query=${query}`);

      return res.data;
    } catch (error) {
      toast.error('ERROR, No orders found');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
