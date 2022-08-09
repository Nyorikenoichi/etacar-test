import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainRoutes } from '../../constants/mainRoutes';
import { CryptoTable } from '../cryptoTable/cryptoTable';
import { CurrencyInfo } from '../currencyInfo/currencyInfo';

export const Content = (): JSX.Element => {
  return (
    <section className="stack stack_vertical content">
      <Routes>
        <Route path={MainRoutes.main} element={<CryptoTable />} />
        <Route path={MainRoutes.about} element={<CurrencyInfo />} />
      </Routes>
    </section>
  );
};
