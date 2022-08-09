import React, { useEffect } from 'react';
import { Content } from './core/components/content/content';
import { Footer } from './core/components/footer/footer';
import { Header } from './core/components/header/header';
import { useAppDispatch } from './core/hooks/useAppDispatch';
import { fetchCurrencies } from './core/redux/slices/currencySlice';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};
