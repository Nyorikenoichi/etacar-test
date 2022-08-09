import React, { useMemo, useState } from 'react';
import { Pagination } from '../pagination/pagination';
import { formatFloat } from '../../helpers/formatFloat';
import { CurrencyInfo } from '../../interfaces/currencyInfo';
import ModalAddCurrency from '../modalAddCurrency/modalAddCurrency';
import { useNavigate } from 'react-router-dom';
import { MainRoutes } from '../../constants/mainRoutes';
import { useAppSelector } from '../../hooks/useAppSelector';
import { laptopMediumWidth, tabletWidth } from '../../constants/screenSizes';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { useTranslation } from 'react-i18next';

const PageSize = 14;

export const CryptoTable = () => {
  const { currencies, error, loading } = useAppSelector(
    (state) => state.currency
  );
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyInfo | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return currencies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, currencies]);

  const onAddCurrency =
    (currency: CurrencyInfo) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setSelectedCurrency(currency);
      setIsModalOpen(true);
    };

  const onGoToInfo =
    (id: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      navigate(`${MainRoutes.about}?id=${id}`);
    };

  return (
    <>
      {loading && <div className="preloader" />}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && currencies.length ? (
        <div className="stack stack_vertical crypto-table__container">
          <table className="crypto-table">
            <thead>
              <tr className="crypto-table__row crypto-table__row_header">
                <th className="crypto-table__cell">{t('crypto_table_rank')}</th>
                <th className="crypto-table__cell crypto-table__cell_align-left crypto-table__cell_wide">
                  {t('crypto_table_name')}
                </th>
                <th className="crypto-table__cell">
                  {t('crypto_table_price')}
                </th>
                {windowWidth > tabletWidth ? (
                  <th className="crypto-table__cell">
                    {t('crypto_table_cap')}
                  </th>
                ) : (
                  ''
                )}
                {windowWidth > tabletWidth ? (
                  <th className="crypto-table__cell">
                    {t('crypto_table_vwap')}
                  </th>
                ) : (
                  ''
                )}
                {windowWidth > laptopMediumWidth ? (
                  <th className="crypto-table__cell">
                    {t('crypto_table_supply')}
                  </th>
                ) : (
                  ''
                )}
                {windowWidth > laptopMediumWidth ? (
                  <th className="crypto-table__cell">
                    {t('crypto_table_volume')}
                  </th>
                ) : (
                  ''
                )}
                <th className="crypto-table__cell">
                  {t('crypto_table_change')}
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((item) => {
                return (
                  <tr
                    className="crypto-table__row crypto-table__row_body crypto-table__row_clickable"
                    key={item.id}
                    onClick={onGoToInfo(item.id)}
                  >
                    <td className="crypto-table__cell">{item.rank}</td>
                    <td className="crypto-table__cell crypto-table__cell_align-left">
                      {item.name}
                    </td>
                    <td className="crypto-table__cell">
                      ${formatFloat(item.priceUsd)}
                    </td>
                    {windowWidth > tabletWidth ? (
                      <td className="crypto-table__cell">
                        ${formatFloat(item.marketCapUsd)}
                      </td>
                    ) : (
                      ''
                    )}
                    {windowWidth > tabletWidth ? (
                      <td className="crypto-table__cell">
                        ${formatFloat(item.vwap24Hr)}
                      </td>
                    ) : (
                      ''
                    )}
                    {windowWidth > laptopMediumWidth ? (
                      <td className="crypto-table__cell">
                        {formatFloat(item.supply)}
                      </td>
                    ) : (
                      ''
                    )}
                    {windowWidth > laptopMediumWidth ? (
                      <td className="crypto-table__cell">
                        ${formatFloat(item.volumeUsd24Hr)}
                      </td>
                    ) : (
                      ''
                    )}
                    <td className="crypto-table__cell">
                      {typeof item.changePercent24Hr === 'string'
                        ? `${formatFloat(item.changePercent24Hr)}%`
                        : ''}
                    </td>
                    <td className="crypto-table__cell">
                      <div
                        className="cryptoTable__cell_button"
                        onClick={onAddCurrency(item)}
                      >
                        +
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalCount={currencies.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
            siblingCount={1}
          />
        </div>
      ) : null}
      {isModalOpen && (
        <ModalAddCurrency
          setIsOpen={setIsModalOpen}
          currency={selectedCurrency}
        />
      )}
    </>
  );
};
