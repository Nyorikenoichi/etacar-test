import React, { useState } from 'react';
import { formatFloat } from '../../lib/helpers/formatFloat';
import { ModalBriefcase } from '../modalBriefcase/modalBriefcase';
import { useAppSelector } from '../../lib/hooks/useAppSelector';
import { useBriefcaseStats } from '../../lib/hooks/useBriefcaseValues';
import { useTranslation } from 'react-i18next';

export const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const briefcase = useAppSelector((state) => state.briefcase.currencies);
  const { currencies } = useAppSelector((state) => state.currency);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topCurrencies = currencies.slice(0, 3);
  const { initialBriefcasePrice, diff, percentDiff, showPlus } = useBriefcaseStats({
    briefcase,
    currencies,
  });

  const onOpenBriefcase = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

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
        <p className="header__briefcase-title">{t('briefcase_title')}</p>
        <div className="stack stack_vertical header__briefcase-summary">
          <div>
            ${formatFloat(initialBriefcasePrice)} {showPlus} {formatFloat(diff)}
          </div>
          <div>
            ({showPlus}
            {formatFloat(percentDiff)}%)
          </div>
        </div>
      </div>
      {isModalOpen && <ModalBriefcase setIsOpen={setIsModalOpen} />}
    </header>
  );
};
