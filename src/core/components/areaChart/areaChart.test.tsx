import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AreaChart } from './areaChart';
import { HistoryItem } from '../../lib/interfaces/historyItem';

const history: HistoryItem[] = [
  { priceUsd: '46448.7625666826190392', time: 1628985600000 },
  { priceUsd: '46953.4801316103380567', time: 1629072000000 },
  { priceUsd: '45986.5228431102022226', time: 1629158400000 },
  { priceUsd: '45154.6886697612712484', time: 1629244800000 },
  { priceUsd: '45226.9076561575262501', time: 1629331200000 },
  { priceUsd: '47792.0212083321042055', time: 1629417600000 },
  { priceUsd: '49061.8805949181657870', time: 1629504000000 },
  { priceUsd: '48908.6248551045851620', time: 1629590400000 },
  { priceUsd: '49900.4695635912542356', time: 1629676800000 },
];

it('NumberInput component', () => {
  render(<AreaChart history={history} />);
  const areaChart = screen.getByRole('img');
  expect(areaChart).toBeInTheDocument();
  expect(areaChart).toHaveClass('area-chart');
});
