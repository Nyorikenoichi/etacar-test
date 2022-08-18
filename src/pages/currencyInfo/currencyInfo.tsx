import React, { useEffect, useState } from 'react';
import { useQuery } from '../../core/lib/hooks/useQuery';
import { formatFloat } from '../../core/lib/helpers/formatFloat';
import { MainRoutes } from '../../core/lib/constants/mainRoutes';
import { useNavigate } from 'react-router-dom';
import { AreaChart } from '../../core/common/areaChart/areaChart';
import { useAppSelector } from '../../core/lib/hooks/useAppSelector';
import { useAppDispatch } from '../../core/lib/hooks/useAppDispatch';
import { fetchHistory } from '../../core/redux/slices/currencySlice';
import ModalAddCurrency from '../../core/components/modalAddCurrency/modalAddCurrency';
import { getHistoryStats } from '../../core/lib/helpers/getHistoryStats';
import { useTranslation } from 'react-i18next';
import { Preloader } from '../../core/common/preloader/preloader';
import { Button } from '../../core/common/button/button';
import { ButtonVariants } from '../../core/lib/constants/buttonVariants';
import { useWindowSize } from '../../core/lib/hooks/useWindowWidth';
import {
  laptopLargeWidth,
  laptopWidth,
  mobileBigWidth,
  tabletWidth,
} from '../../core/lib/constants/screenSizes';

export const CurrencyInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currencies, history, error, loading } = useAppSelector((state) => state.currency);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const currencyId = query.get('id');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const currency = currencies.find((item) => item.id === currencyId);

  const [windowWidth] = useWindowSize();

  let areaChartSizes = [800, 400];
  if (windowWidth < laptopLargeWidth) {
    areaChartSizes = [650, 360];
  }
  if (windowWidth < laptopWidth) {
    areaChartSizes = [550, 320];
  }
  if (windowWidth < tabletWidth) {
    areaChartSizes = [400, 300];
  }
  if (windowWidth < mobileBigWidth) {
    areaChartSizes = [300, 300];
  }

  useEffect(() => {
    if (currencyId != null) {
      dispatch(fetchHistory(currencyId));
    }
  }, [currencyId, dispatch]);

  const { currentPrice, maxPrice, minPrice, averagePrice } = getHistoryStats(history);

  const onBackToMain = () => {
    navigate(MainRoutes.main);
  };

  const onAddCurrency = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {loading && <Preloader />}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && history.length ? (
        <div className="stack stack_vertical currency-info">
          <Button variant={ButtonVariants.close} onClick={onBackToMain}>
            {'<'}
          </Button>
          <div className="stack">
            <div className="currency-info__heading">{currency?.name}</div>
            <Button variant={ButtonVariants.add} onClick={onAddCurrency}>
              {t('add_button')}
            </Button>
          </div>
          <div className="stack currency-info__prices">
            <p>
              {t('currency_info_price')} ${formatFloat(currentPrice)}
            </p>
            <p>
              {t('currency_info_max')} ${formatFloat(maxPrice)}
            </p>
            <p>
              {t('currency_info_min')} ${formatFloat(minPrice)}
            </p>
            <p>
              {t('currency_info_avg')} ${formatFloat(averagePrice)}
            </p>
          </div>
          <AreaChart history={history} width={areaChartSizes[0]} height={areaChartSizes[1]} />
        </div>
      ) : null}
      {isModalOpen && <ModalAddCurrency setIsOpen={setIsModalOpen} currency={currency} />}
    </>
  );
};
