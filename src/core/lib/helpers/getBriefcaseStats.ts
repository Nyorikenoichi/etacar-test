import {
  calculateCurrentBriefcasePrice,
  calculateInitialBriefcasePrice,
} from './briefcaseCalculators';
import { BriefcaseItem } from '../interfaces/briefcaseItem';
import { CurrencyInfo } from '../interfaces/currencyInfo';

interface GetBriefcaseStatsResult {
  currentBriefcasePrice: number;
  initialBriefcasePrice: number;
  diff: number;
  percentDiff: number;
  showPlus: string;
}

export const getBriefcaseStats = (
  briefcase: BriefcaseItem[],
  currencies: CurrencyInfo[]
): GetBriefcaseStatsResult => {
  const currentBriefcasePrice = calculateCurrentBriefcasePrice(briefcase, currencies);
  const initialBriefcasePrice = calculateInitialBriefcasePrice(briefcase);
  const diff = currentBriefcasePrice - initialBriefcasePrice;
  const percentDiff = initialBriefcasePrice ? (diff / initialBriefcasePrice) * 100 : 0;
  const showPlus = diff >= 0 ? '+' : '';

  return {
    currentBriefcasePrice,
    initialBriefcasePrice,
    diff,
    percentDiff,
    showPlus,
  };
};
