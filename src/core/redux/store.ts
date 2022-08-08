import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './slices/currencySlice';
import { briefcaseReducer } from './slices/briefcaseSlice';

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    briefcase: briefcaseReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
