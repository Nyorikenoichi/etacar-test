import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PieChart, PieChartProps } from './pieChart';
import { briefcasesMock } from '../../lib/mockup/briefcaseMock';

const briefcase = briefcasesMock[1];
briefcase[1].count = 50;
briefcase[2].count = 200000;

export default {
  title: 'Pie chart',
  component: PieChart,
} as Meta;

const Template: Story<PieChartProps> = (args: PieChartProps) => <PieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  briefcase: briefcase,
  width: 250,
  height: 250,
};
