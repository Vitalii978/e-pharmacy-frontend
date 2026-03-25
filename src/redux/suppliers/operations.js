import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getSuppliers = createAsyncThunk(
  'suppliers/getAll',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/api/suppliers');

      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSuppliersByQuery = createAsyncThunk(
  'suppliers/getByQuery',
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      const res = await axios.get(`/api/suppliers?query=${query}`);

      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addSupplier = createAsyncThunk(
  'suppliers/add',
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      const res = await axios.post('/api/suppliers', data);

      toast.success('Supplier added successfully');
      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editSupplier = createAsyncThunk(
  'suppliers/edit',
  async ({ data, id }, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      const res = await axios.put(`/api/suppliers/${id}`, data);

      toast.success('Supplier edited successfully');
      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
