import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyInfo } from '../../interfaces/currencyInfo';

interface InitialState {
  loading: boolean;
  currencies: CurrencyInfo[];
  error: string;
}

const initialState: InitialState = {
  loading: false,
  currencies: [],
  error: '',
};

const fetchUrl = 'https://api.coincap.io/v2/assets';

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  async () => {
    const response = await axios.get(fetchUrl);
    const apiData = await response.data;
    return apiData.data;
  }
);

const userSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCurrencies.fulfilled,
      (state, action: PayloadAction<CurrencyInfo[]>) => {
        state.loading = false;
        state.currencies = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.loading = false;
      state.currencies = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default userSlice.reducer;
