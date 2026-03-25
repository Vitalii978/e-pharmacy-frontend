import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { dashboardReducer } from './dashboard/dashboardSlice';
import { ordersReducer } from './orders/ordersSlice';
import { suppliersReducer } from './suppliers/suppliersSlice';
import { productsReducer } from './products/productsSlice';
import { customerReducer } from './customers/customerSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    dashboard: dashboardReducer,
    orders: ordersReducer,
    suppliers: suppliersReducer,
    products: productsReducer,
    customers: customerReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
