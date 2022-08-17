import { CurrencyInfo } from '../interfaces/currencyInfo';
import { BriefcaseItem } from '../interfaces/briefcaseItem';

const emptyCurrency: CurrencyInfo = {
  id: '',
  rank: '',
  symbol: '',
  name: '',
  supply: '',
  maxSupply: '',
  marketCapUsd: '',
  volumeUsd24Hr: '',
  priceUsd: '',
  changePercent24Hr: '',
  vwap24Hr: '',
};

export const briefcasesMock: BriefcaseItem[][] = [
  [{ id: 'binance-usd', name: 'Binance USD', initialPrice: 1, count: 1234 }],
  [
    { id: 'bitcoin', name: 'Bitcoin', initialPrice: 20000, count: 1.5 },
    { id: 'ethereum', name: 'Ethereum', initialPrice: 1500, count: 2 },
    { id: 'dogecoin', name: 'Dogecoin', initialPrice: 0.1, count: 1000 },
  ],
];

export const currenciesMock: CurrencyInfo[] = [
  { ...emptyCurrency, id: 'bitcoin', priceUsd: '30000' },
  { ...emptyCurrency, id: 'ethereum', priceUsd: '2000' },
  { ...emptyCurrency, id: 'dogecoin', priceUsd: '0.2' },
  { ...emptyCurrency, id: 'binance-usd', priceUsd: '1' },
];
