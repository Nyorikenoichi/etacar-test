import { BriefcaseItem } from '../interfaces/briefcaseItem';
import { CurrencyInfo } from '../interfaces/currencyInfo';

export const calculateInitialBriefcasePrice = (
  briefcase: BriefcaseItem[]
): number => {
  return briefcase.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.initialPrice * currentValue.count,
    0
  );
};

export const calculateCurrentBriefcasePrice = (
  briefcase: BriefcaseItem[],
  currencies: CurrencyInfo[]
): number => {
  return briefcase.reduce((previousValue, currentValue) => {
    const currency = currencies.find((item) => item.id === currentValue.id);
    const currentPrice =
      (currency ? parseFloat(currency.priceUsd) : 0) * currentValue.count;
    return previousValue + currentPrice;
  }, 0);
};
