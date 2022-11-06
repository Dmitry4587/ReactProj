import { configureStore } from '@reduxjs/toolkit';
import heroes from '../slices/heroSlice';
import filters from '../slices/filterSlice';

export const store = configureStore({
  reducer: { heroes, filters },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
