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

const Template: Story<PieChartProps> = (args: PieChartProps) => (
  <div className="pie-chart">
    <PieChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  briefcase: briefcase,
  width: 1200,
  height: 400,
};
