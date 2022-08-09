import {
  calculateCurrentBriefcasePrice,
  calculateInitialBriefcasePrice,
} from '../helpers/briefcaseCalculators';
import { useAppSelector } from './useAppSelector';

interface UseBriefcasePricesResult {
  currentBriefcasePrice: number;
  initialBriefcasePrice: number;
  diff: number;
  percentDiff: number;
  showPlus: string;
}

export const useBriefcaseStats = (): UseBriefcasePricesResult => {
  const { currencies } = useAppSelector((state) => state.currency);
  const briefcase = useAppSelector((state) => state.briefcase);

  const currentBriefcasePrice = calculateCurrentBriefcasePrice(
    briefcase.currencies,
    currencies
  );
  const initialBriefcasePrice = calculateInitialBriefcasePrice(
    briefcase.currencies
  );
  const diff = currentBriefcasePrice - initialBriefcasePrice;
  const percentDiff = initialBriefcasePrice
    ? (diff / initialBriefcasePrice) * 100
    : 0;
  const showPlus = diff >= 0 ? '+' : '';

  return {
    currentBriefcasePrice,
    initialBriefcasePrice,
    diff,
    percentDiff,
    showPlus,
  };
};
