import { formatFloat } from './formatFloat';

it('formatFloat helper', () => {
  expect(formatFloat(100000000000)).toBe('100.00b');
  expect(formatFloat(10000000000)).toBe('10.00b');
  expect(formatFloat(1000000000)).toBe('1.00b');
  expect(formatFloat(2340000000)).toBe('2.34b');
  expect(formatFloat(2345000000)).toBe('2.35b');

  expect(formatFloat(100000000)).toBe('100.00m');
  expect(formatFloat(10000000)).toBe('10.00m');
  expect(formatFloat(1000000)).toBe('1.00m');
  expect(formatFloat(2340000)).toBe('2.34m');
  expect(formatFloat(2345000)).toBe('2.35m');

  expect(formatFloat(100000)).toBe('100.00k');
  expect(formatFloat(10000)).toBe('10.00k');
  expect(formatFloat(1000)).toBe('1.00k');
  expect(formatFloat(2340)).toBe('2.34k');
  expect(formatFloat(2345)).toBe('2.35k');

  expect(formatFloat(100)).toBe('100.00');
  expect(formatFloat(10)).toBe('10.00');
  expect(formatFloat(1)).toBe('1.00');
  expect(formatFloat(2.34)).toBe('2.34');
  expect(formatFloat(2.345)).toBe('2.35');

  expect(formatFloat(0.1)).toBe('0.10');
  expect(formatFloat(0.01)).toBe('0.01');
  expect(formatFloat(0.0000001)).toBe('0.0000001');
});

export {};
