import { HistoryItem } from '../interfaces/historyItem';

interface UseHistoryPricesResult {
  currentPrice: number;
  maxPrice: number;
  minPrice: number;
  averagePrice: number;
}

export const useHistoryPrices = (
  history: HistoryItem[]
): UseHistoryPricesResult => {
  const currentPrice = history.length
    ? parseFloat(history[history.length - 1].priceUsd)
    : 0;
  const maxPrice = history.length
    ? parseFloat(
        history.reduce((previous, current) =>
          parseFloat(previous.priceUsd) > parseFloat(current.priceUsd)
            ? previous
            : current
        ).priceUsd
      )
    : 0;
  const minPrice = history.length
    ? parseFloat(
        history.reduce((previous, current) =>
          parseFloat(previous.priceUsd) < parseFloat(current.priceUsd)
            ? previous
            : current
        ).priceUsd
      )
    : 0;
  const averagePrice = history.length
    ? history.reduce(
        (previous, current) => previous + parseFloat(current.priceUsd),
        0
      ) / history.length
    : 0;
  return { currentPrice, maxPrice, minPrice, averagePrice };
};
