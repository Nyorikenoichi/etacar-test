import React from 'react';
import { useQuery } from '../../hooks/useQuery';
import mockHistory from '../../mock-history.json';
import { formatFloat } from '../../helpers/formatFloat';
import { MainRoutes } from '../../constants/mainRoutes';
import { useNavigate } from 'react-router-dom';
import { AreaChart } from '../areaChart/areaChart';
import { HistoryItem } from '../../interfaces/history';

export const CurrencyInfo = (): JSX.Element => {
  const navigate = useNavigate();

  const query = useQuery();
  const currencyId = query.get('id');

  const history: HistoryItem[] = mockHistory.map((item) => {
    return { time: item.time, priceUsd: parseFloat(item.priceUsd) };
  });

  const currentPrice = history[history.length - 1].priceUsd.toString();
  const maxPrice = history
    .reduce((previous, current) =>
      previous.priceUsd > current.priceUsd ? previous : current
    )
    .priceUsd.toString();
  const minPrice = history
    .reduce((previous, current) =>
      previous.priceUsd < current.priceUsd ? previous : current
    )
    .priceUsd.toString();
  const averagePrice = (
    history.reduce((previous, current) => previous + current.priceUsd, 0) /
    history.length
  ).toString();

  const onBackToMain = () => {
    navigate(MainRoutes.main);
  };

  return (
    <div className="stack stack_vertical currency-info">
      <button className="close-button" onClick={onBackToMain}>
        {'<'}
      </button>
      <h3>{currencyId}</h3>
      <div className="stack">
        <p>Current price: {formatFloat(currentPrice)}</p>
        <p>Maximal price: {formatFloat(maxPrice)}</p>
        <p>Minimal price: {formatFloat(minPrice)}</p>
        <p>Average price: {formatFloat(averagePrice)}</p>
      </div>
      <AreaChart history={history} />
    </div>
  );
};
