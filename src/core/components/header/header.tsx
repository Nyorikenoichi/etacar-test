import React, { useState } from 'react';
import { formatFloat } from '../../helpers/formatFloat';
import { ModalBriefcase } from '../modalBriefcase/modalBriefcase';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  calculateCurrentBriefcasePrice,
  calculateInitialBriefcasePrice,
} from '../../helpers/briefcaseCalculators';

export const Header = (): JSX.Element => {
  const { currencies } = useAppSelector((state) => state.currency);
  const briefcase = useAppSelector((state) => state.briefcase);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const topCurrencies = currencies.slice(0, 3);
  const currentBriefcaseValue = calculateCurrentBriefcasePrice(
    briefcase.currencies,
    currencies
  );
  const initialBriefcaseValue = calculateInitialBriefcasePrice(
    briefcase.currencies
  );

  const diff = currentBriefcaseValue - initialBriefcaseValue;
  const percentDiff = initialBriefcaseValue
    ? (diff / initialBriefcaseValue) * 100
    : 0;

  const onOpenBriefcase = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const showPlus = diff >= 0 ? '+' : '';

  return (
    <header className="stack header">
      <div className="stack header__currencies">
        {topCurrencies.map((item) => (
          <p className="header__currency" key={item.id}>
            {item.name}: ${formatFloat(item.priceUsd)}
          </p>
        ))}
      </div>
      <div className="stack header__briefcase" onClick={onOpenBriefcase}>
        <p className="header__briefcase-title">Briefcase: </p>
        <div className="stack stack_vertical header__briefcase-summary">
          <div>
            ${formatFloat(initialBriefcaseValue.toString())} {showPlus}{' '}
            {formatFloat(diff.toString())}
          </div>
          <div>
            ({showPlus}
            {formatFloat(percentDiff.toFixed(2))}%)
          </div>
        </div>
      </div>
      {isModalOpen && <ModalBriefcase setIsOpen={setIsModalOpen} />}
    </header>
  );
};
