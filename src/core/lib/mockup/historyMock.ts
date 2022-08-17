import { HistoryItem } from '../interfaces/historyItem';

export const historyMock: HistoryItem[][] = [
  [
    { time: 1, priceUsd: '2' },
    { time: 2, priceUsd: '4' },
  ],
  [
    { time: 1, priceUsd: '1' },
    { time: 2, priceUsd: '4' },
    { time: 3, priceUsd: '3' },
    { time: 4, priceUsd: '2' },
  ],
];
