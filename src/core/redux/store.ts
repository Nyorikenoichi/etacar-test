import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './slices/currenciesSlice';

const store = configureStore({
  reducer: {
    currency: currenciesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
