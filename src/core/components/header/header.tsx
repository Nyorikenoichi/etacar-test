import React from 'react';
import data from '../../mock-data.json';
import { formatFloat } from '../../helpers/formatFloat';

export const Header = (): JSX.Element => {
  const currencies = data.slice(0, 3);
  const currentBriefcaseValue = 5823.19;
  const initialBriefcaseValue = 5000;

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
      <div className="stack header__briefcase">
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
    </header>
  );
};
