import React, { useMemo, useState } from 'react';
import { Pagination } from '../../core/components/pagination/pagination';
import { formatFloat } from '../../core/lib/helpers/formatFloat';
import { CurrencyInfo } from '../../core/lib/interfaces/currencyInfo';
import ModalAddCurrency from '../../core/components/modalAddCurrency/modalAddCurrency';
import { useNavigate } from 'react-router-dom';
import { MainRoutes } from '../../core/lib/constants/mainRoutes';
import { useAppSelector } from '../../core/lib/hooks/useAppSelector';
import { laptopMediumWidth, tabletWidth } from '../../core/lib/constants/screenSizes';
import { useWindowWidth } from '../../core/lib/hooks/useWindowWidth';
import { useTranslation } from 'react-i18next';
import { paginationSiblingsCount, tablePageSize } from '../../core/lib/constants/tableSettings';
import { Preloader } from '../../core/common/preloader/preloader';

export const MainCryptoTable = () => {
  const { currencies, error, loading } = useAppSelector((state) => state.currency);
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyInfo | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * tablePageSize;
    const lastPageIndex = firstPageIndex + tablePageSize;
    return currencies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, currencies]);

  const onAddCurrency =
    (currency: CurrencyInfo) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setSelectedCurrency(currency);
      setIsModalOpen(true);
    };

  const onGoToInfo = (id: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`${MainRoutes.info}?id=${id}`);
  };

  return (
    <>
      {loading && <Preloader />}
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
                <th className="crypto-table__cell">{t('crypto_table_price')}</th>
                {windowWidth > tabletWidth ? (
                  <th className="crypto-table__cell">{t('crypto_table_cap')}</th>
                ) : (
                  ''
                )}
                {windowWidth > tabletWidth ? (
                  <th className="crypto-table__cell">{t('crypto_table_vwap')}</th>
                ) : (
                  ''
                )}
                {windowWidth > laptopMediumWidth ? (
                  <th className="crypto-table__cell">{t('crypto_table_supply')}</th>
                ) : (
                  ''
                )}
                {windowWidth > laptopMediumWidth ? (
                  <th className="crypto-table__cell">{t('crypto_table_volume')}</th>
                ) : (
                  ''
                )}
                <th className="crypto-table__cell">{t('crypto_table_change')}</th>
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
                    <td className="crypto-table__cell">${formatFloat(item.priceUsd)}</td>
                    {windowWidth > tabletWidth ? (
                      <td className="crypto-table__cell">${formatFloat(item.marketCapUsd)}</td>
                    ) : (
                      ''
                    )}
                    {windowWidth > tabletWidth ? (
                      <td className="crypto-table__cell">${formatFloat(item.vwap24Hr)}</td>
                    ) : (
                      ''
                    )}
                    {windowWidth > laptopMediumWidth ? (
                      <td className="crypto-table__cell">{formatFloat(item.supply)}</td>
                    ) : (
                      ''
                    )}
                    {windowWidth > laptopMediumWidth ? (
                      <td className="crypto-table__cell">${formatFloat(item.volumeUsd24Hr)}</td>
                    ) : (
                      ''
                    )}
                    <td className="crypto-table__cell">
                      {typeof item.changePercent24Hr === 'string'
                        ? `${formatFloat(item.changePercent24Hr)}%`
                        : ''}
                    </td>
                    <td className="crypto-table__cell">
                      <div className="cryptoTable__cell_button" onClick={onAddCurrency(item)}>
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
            pageSize={tablePageSize}
            onPageChange={(page) => setCurrentPage(page)}
            siblingCount={paginationSiblingsCount}
          />
        </div>
      ) : null}
      {isModalOpen && <ModalAddCurrency setIsOpen={setIsModalOpen} currency={selectedCurrency} />}
    </>
  );
};
