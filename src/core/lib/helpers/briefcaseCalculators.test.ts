import {
  calculateCurrentBriefcasePrice,
  calculateInitialBriefcasePrice,
} from './briefcaseCalculators';
import { briefcasesMock, currenciesMock, briefcasesMockPrices } from '../mockup/briefcaseMock';

it('calculateInitialBriefcasePrice helper', () => {
  expect(calculateInitialBriefcasePrice(briefcasesMock[0])).toBe(briefcasesMockPrices[0].initial);
  expect(calculateInitialBriefcasePrice(briefcasesMock[1])).toBe(briefcasesMockPrices[1].initial);
});

it('calculateCurrentBriefcasePrice helper', () => {
  expect(calculateCurrentBriefcasePrice(briefcasesMock[0], currenciesMock)).toBe(
    briefcasesMockPrices[0].current
  );
  expect(calculateCurrentBriefcasePrice(briefcasesMock[1], currenciesMock)).toBe(
    briefcasesMockPrices[1].current
  );
});
