import React from 'react';
import { Preloader } from './preloader';

export default {
  title: 'Preloader',
  component: Preloader,
};

const Template = (arg: JSX.IntrinsicAttributes) => <Preloader {...arg} />;

export const Default = Template.bind({});
