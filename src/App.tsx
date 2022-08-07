import React from 'react';
import { Content } from './core/components/content/content';
import { Footer } from './core/components/footer/footer';
import { Header } from './core/components/header/header';

export const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};
