import React, { useState } from 'react';
import data from '../../mock-data.json';
import { formatFloat } from '../../helpers/formatFloat';
import ModalBriefcase from '../modalBriefcase/modalBriefcase';
import { CurrencyInfo } from '../../interfaces/currencyInfo';

export const Header = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currencies: CurrencyInfo[] = data.slice(0, 3);
  const currentBriefcaseValue = 1683.14;
  const initialBriefcaseValue = 1500;

  const diff = currentBriefcaseValue - initialBriefcaseValue;
  const percentDiff = (diff / initialBriefcaseValue) * 100;

  return (
    <header className="stack header">
      <div className="stack header__currencies">
        {currencies.map((item) => (
          <p key={item.id}>
            {item.name}: ${formatFloat(item.priceUsd)}
          </p>
        ))}
      </div>
      <div
        className="stack header__briefcase"
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        <p>Briefcase: </p>
        <div className="stack stack_vertical header__briefcase-summary">
          <div>
            ${initialBriefcaseValue} {diff > 0 ? '+' : '-'}{' '}
            {formatFloat(diff.toString())}
          </div>
          <div>
            ({+diff > 0 ? '+' : ''}
            {formatFloat(percentDiff.toFixed(2))}%)
          </div>
        </div>
      </div>
      {isModalOpen && <ModalBriefcase setIsOpen={setIsModalOpen} />}
    </header>
  );
};
