import {
  calculateCurrentBriefcasePrice,
  calculateInitialBriefcasePrice,
} from '../helpers/briefcaseCalculators';
import { BriefcaseItem } from '../interfaces/briefcaseItem';
import { CurrencyInfo } from '../interfaces/currencyInfo';

interface UseBriefcaseStatsResult {
  currentBriefcasePrice: number;
  initialBriefcasePrice: number;
  diff: number;
  percentDiff: number;
  showPlus: string;
}

interface UseBriefcaseProps {
  briefcase: BriefcaseItem[];
  currencies: CurrencyInfo[];
}

export const useBriefcaseStats = ({
  briefcase,
  currencies,
}: UseBriefcaseProps): UseBriefcaseStatsResult => {
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
