import { CurrencyInfo } from './CurrencyInfo';

export interface Briefcase {
  currencies: {
    currency: CurrencyInfo;
    count: number;
  }[];
  initialPrice: number;
}
