import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import registerReducer from './slices/registerSlice.js';
import { apiSlice } from './api/apiSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
