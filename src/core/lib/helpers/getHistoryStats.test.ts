import { historyMock } from '../mockup/historyMock';
import { getHistoryStats } from './getHistoryStats';

it('getHistoryStats helper', () => {
  let { currentPrice, maxPrice, minPrice, averagePrice } = getHistoryStats(historyMock[0]);
  expect(currentPrice).toBe(4);
  expect(maxPrice).toBe(4);
  expect(minPrice).toBe(2);
  expect(averagePrice).toBeCloseTo(3);

  ({ currentPrice, maxPrice, minPrice, averagePrice } = getHistoryStats(historyMock[1]));
  expect(currentPrice).toBe(2);
  expect(maxPrice).toBe(4);
  expect(minPrice).toBe(1);
  expect(averagePrice).toBeCloseTo(2.5);
});
