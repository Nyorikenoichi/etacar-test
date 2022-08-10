import React, { useEffect } from 'react';
import { Footer } from './core/components/footer/footer';
import { Header } from './core/components/header/header';
import { useAppDispatch } from './core/lib/hooks/useAppDispatch';
import { fetchCurrencies } from './core/redux/slices/currencySlice';
import { Route, Routes } from 'react-router-dom';
import { MainRoutes } from './core/lib/constants/mainRoutes';
import { MainCryptoTable } from './pages/mainCryptoTable/mainCryptoTable';
import { CurrencyInfo } from './pages/currencyInfo/currencyInfo';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <>
      <Header />
      <section className="stack stack_vertical content">
        <Routes>
          <Route path={MainRoutes.main} element={<MainCryptoTable />} />
          <Route path={MainRoutes.info} element={<CurrencyInfo />} />
        </Routes>
      </section>
      <Footer />
    </>
  );
};
