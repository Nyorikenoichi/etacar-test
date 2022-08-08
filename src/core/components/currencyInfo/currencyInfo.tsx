import React, { useEffect, useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { formatFloat } from '../../helpers/formatFloat';
import { MainRoutes } from '../../constants/mainRoutes';
import { useNavigate } from 'react-router-dom';
import { AreaChart } from '../areaChart/areaChart';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchHistory } from '../../redux/slices/currencySlice';
import ModalAddCurrency from '../modalAddCurrency/modalAddCurrency';

export const CurrencyInfo = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const query = useQuery();
  const currencyId = query.get('id');

  const { currencies, history, error, loading } = useAppSelector(
    (state) => state.currency
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currencyId != null) {
      dispatch(fetchHistory(currencyId));
    }
  }, [currencyId, dispatch]);

  const currency = currencies.find((item) => item.id === currencyId);

  const currentPrice = history.length
    ? history[history.length - 1].priceUsd.toString()
    : '';
  const maxPrice = history.length
    ? history
        .reduce((previous, current) =>
          previous.priceUsd > current.priceUsd ? previous : current
        )
        .priceUsd.toString()
    : '';
  const minPrice = history.length
    ? history
        .reduce((previous, current) =>
          previous.priceUsd < current.priceUsd ? previous : current
        )
        .priceUsd.toString()
    : '';
  const averagePrice = history.length
    ? (
        history.reduce(
          (previous, current) => previous + parseFloat(current.priceUsd),
          0
        ) / history.length
      ).toString()
    : '';

  const onBackToMain = () => {
    navigate(MainRoutes.main);
  };

  const onAddCurrency = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {loading && <div className="preloader" />}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && history.length ? (
        <div className="stack stack_vertical currency-info">
          <button className="close-button" onClick={onBackToMain}>
            {'<'}
          </button>
          <div className="stack">
            <div className="currency-info__heading">{currency?.name}</div>
            <button className="accept-button" onClick={onAddCurrency}>
              Add to briefcase
            </button>
          </div>
          <div className="stack currency-info__prices">
            <p>Price: ${formatFloat(currentPrice)}</p>
            <p>Maximal: ${formatFloat(maxPrice)}</p>
            <p>Minimal: ${formatFloat(minPrice)}</p>
            <p>Average: ${formatFloat(averagePrice)}</p>
          </div>
          <AreaChart history={history} />
        </div>
      ) : null}
      {isModalOpen && (
        <ModalAddCurrency setIsOpen={setIsModalOpen} currency={currency} />
      )}
    </>
  );
};
