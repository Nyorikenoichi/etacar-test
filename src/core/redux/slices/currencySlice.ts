import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyInfo } from '../../interfaces/currencyInfo';
import { HistoryItem } from '../../interfaces/historyItem';

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

const apiUrl = 'https://api.coincap.io/v2/assets';

export const fetchCurrencies = createAsyncThunk('currency/fetchCurrencies', async () => {
  const response = await axios.get(apiUrl);
  const apiData = await response.data;
  return apiData.data;
});

export const fetchHistory = createAsyncThunk(
  'currency/fetchCurrencyHistory',
  async (id: string) => {
    const response = await axios.get(`${apiUrl}/${id}/history?interval=d1`);
    const apiData = await response.data;
    return apiData.data;
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
