import { getBriefcaseStats } from './getBriefcaseStats';
import { briefcasesMock, currenciesMock, briefcasesMockPrices } from '../mockup/briefcaseMock';

it('getBriefcaseStats helper', () => {
  let { currentBriefcasePrice, initialBriefcasePrice, diff, percentDiff, showPlus } =
    getBriefcaseStats(briefcasesMock[0], currenciesMock);
  expect(currentBriefcasePrice).toBe(briefcasesMockPrices[0].current);
  expect(initialBriefcasePrice).toBe(briefcasesMockPrices[0].initial);
  expect(diff).toBe(0);
  expect(percentDiff).toBe(0);
  expect(showPlus).toBe('+');

  ({ currentBriefcasePrice, initialBriefcasePrice, diff, percentDiff, showPlus } =
    getBriefcaseStats(briefcasesMock[1], currenciesMock));
  expect(currentBriefcasePrice).toBe(briefcasesMockPrices[1].current);
  expect(initialBriefcasePrice).toBe(briefcasesMockPrices[1].initial);
  expect(diff).toBe(16100);
  expect(percentDiff).toBeCloseTo(48.64);
  expect(showPlus).toBe('+');
});
