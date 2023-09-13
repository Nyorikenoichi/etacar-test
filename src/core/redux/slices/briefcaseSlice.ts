import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BriefcaseItem } from '../../lib/interfaces/briefcaseItem';

const localStorageKey = 'briefcase';

interface InitialState {
  currencies: BriefcaseItem[];
}

const fromLocalStorage = localStorage.getItem(localStorageKey);

const initialState: InitialState = {
  currencies: fromLocalStorage ? JSON.parse(fromLocalStorage).currencies : [],
};

const briefcaseSlice = createSlice({
  name: 'briefcase',
  initialState,
  reducers: {
    addCurrency: (state, action: PayloadAction<BriefcaseItem>) => {
      const currencyIndex = state.currencies.findIndex((item) => item.id === action.payload.id);
      if (currencyIndex === -1) {
        state.currencies = [...state.currencies, action.payload];
      } else {
        const { initialPrice: oldPrice, count: oldCount } = state.currencies[currencyIndex];

        const newCount = oldCount + action.payload.count;
        const newPrice =
          (oldPrice * oldCount + action.payload.initialPrice * action.payload.count) / newCount;

        state.currencies[currencyIndex].initialPrice = newPrice;
        state.currencies[currencyIndex].count = newCount;
      }
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    removeCurrency: (state, action: PayloadAction<string>) => {
      state.currencies = state.currencies.filter((item) => item.id !== action.payload);
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
  },
});

export const briefcaseReducer = briefcaseSlice.reducer;
export const { addCurrency, removeCurrency } = briefcaseSlice.actions;
