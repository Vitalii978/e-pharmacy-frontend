import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/api/products');

      return res.data;
    } catch (error) {
      toast.error('ERROR, Connection error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductsByQuery = createAsyncThunk(
  'products/getByQuery',
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      const res = await axios.get(`/api/products?query=${query}`);

      return res.data.products;
    } catch (error) {
      toast.error('ERROR, No products found');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      const res = await axios.post('/api/products', data);

      toast.success('Product added successfully');
      return res.data;
    } catch (error) {
      console.log('Ошибка:', error);
      toast.error('ERROR, Unable to add product');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      await axios.delete(`/api/products/${id}`);
      toast.success('Product deleted successfully');

      return id;
    } catch (error) {
      toast.error('ERROR, Unable to delete product');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/edit',
  async ({ data, id }, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      const res = await axios.put(`/api/products/${id}`, data);
      toast.success('Product edited successfully');
      return res.data;
    } catch (error) {
      toast.error('ERROR, Unable to edit product');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
