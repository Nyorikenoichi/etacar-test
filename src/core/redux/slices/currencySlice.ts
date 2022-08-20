import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyInfo } from '../../lib/interfaces/currencyInfo';
import { HistoryItem } from '../../lib/interfaces/historyItem';
import { client } from '../../graphql/client';
import { GET_ALL_CURRENCIES } from '../../graphql/queries/getAllCurrencies';
import { GET_HISTORY_BY_ID } from '../../graphql/queries/getHistoryById';

interface InitialState {
  loading: boolean;
  currencies: CurrencyInfo[];
  history: HistoryItem[];
  error: string;
}

const initialState: InitialState = {
  loading: false,
  currencies: [],
  history: [],
  error: '',
};

export const fetchCurrencies = createAsyncThunk('currency/fetchCurrencies', async () => {
  const response = await client.query({ query: GET_ALL_CURRENCIES });
  const data = response.data;
  return data.getAllCurrencies;
});

export const fetchHistory = createAsyncThunk(
  'currency/fetchCurrencyHistory',
  async (id: string) => {
    const response = await client.query({ query: GET_HISTORY_BY_ID(id) });
    const data = response.data;
    return data.getHistoryById;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action: PayloadAction<CurrencyInfo[]>) => {
      state.loading = false;
      state.currencies = action.payload;
      state.error = '';
    });
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.loading = false;
      state.currencies = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action: PayloadAction<HistoryItem[]>) => {
      state.loading = false;
      state.history = action.payload;
      state.error = '';
    });
    builder.addCase(fetchHistory.rejected, (state, action) => {
      state.loading = false;
      state.history = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export const currencyReducer = currencySlice.reducer;
