import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { PieChart } from './pieChart';
import { briefcasesMock } from '../../lib/mockup/briefcaseMock';
import { render, screen } from '@testing-library/react';

it('NumberInput component', () => {
  render(
    <PieChart briefcase={briefcasesMock[1]} width={400} height={400}>
      pieChart
    </PieChart>
  );
  const pieChart = screen.getByText('pieChart');
  expect(pieChart).toBeInTheDocument();
  expect(pieChart).toHaveClass('pie-chart');
});
