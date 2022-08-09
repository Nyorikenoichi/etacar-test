import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div>{t('author')}</div>
      <div>{t('company_name')}</div>
    </footer>
  );
};
