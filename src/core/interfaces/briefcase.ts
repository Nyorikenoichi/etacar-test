import { CurrencyInfo } from './currencyInfo';

export interface Briefcase {
  currencies: {
    currency: CurrencyInfo;
    count: number;
  }[];
  initialPrice: number;
}
