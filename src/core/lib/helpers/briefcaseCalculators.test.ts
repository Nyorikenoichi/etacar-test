import {
  calculateCurrentBriefcasePrice,
  calculateInitialBriefcasePrice,
} from './briefcaseCalculators';
import { briefcasesMock, currenciesMock } from '../mockup/briefcaseMock';

it('calculateInitialBriefcasePrice helper', () => {
  expect(calculateInitialBriefcasePrice(briefcasesMock[0])).toBe(1234);
  expect(calculateInitialBriefcasePrice(briefcasesMock[1])).toBe(33100);
});

it('calculateCurrentBriefcasePrice helper', () => {
  expect(calculateCurrentBriefcasePrice(briefcasesMock[0], currenciesMock)).toBe(1234);
  expect(calculateCurrentBriefcasePrice(briefcasesMock[1], currenciesMock)).toBe(49200);
});