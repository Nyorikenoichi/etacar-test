import React, { useMemo, useState } from 'react';
import { Pagination } from '../../core/components/pagination/pagination';
import { formatFloat } from '../../core/lib/helpers/formatFloat';
import { CurrencyInfo } from '../../core/lib/interfaces/currencyInfo';
import ModalAddCurrency from '../../core/components/modalAddCurrency/modalAddCurrency';
import { useNavigate } from 'react-router-dom';
import { MainRoutes } from '../../core/lib/constants/mainRoutes';
import { useAppSelector } from '../../core/lib/hooks/useAppSelector';
import { laptopMediumWidth, tabletWidth } from '../../core/lib/constants/screenSizes';
import { useTranslation } from 'react-i18next';
import {
  paginationSiblingsCount,
  defaultTablePageSize,
} from '../../core/lib/constants/tableSettings';
import { Preloader } from '../../core/common/preloader/preloader';
import { CryptoTableHeaderCell } from '../../core/lib/interfaces/cryptoTableHeaderCell';
import { CryptoTable } from '../../core/common/cryptoTable/cryptoTable';
import { useWindowSize } from '../../core/lib/hooks/useWindowWidth';

export const Main = () => {
  const { currencies, error, loading } = useAppSelector((state) => state.currency);
  const [windowWidth, windowHeight] = useWindowSize();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyInfo | null>(null);

  let tablePageSize = defaultTablePageSize;
  if (windowHeight < 900) {
    tablePageSize -= 2;
  }
  if (windowHeight < 800) {
    tablePageSize -= 2;
  }
  if (windowHeight < 700) {
    tablePageSize -= 2;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * tablePageSize;
    const lastPageIndex = firstPageIndex + tablePageSize;
    return currencies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tablePageSize, currencies]);

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

  const headerCells: CryptoTableHeaderCell[] = [
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_rank'),
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell crypto-table__cell_align-left crypto-table__cell_wide',
      content: t('crypto_table_name'),
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_price'),
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_cap'),
      isHidden: windowWidth < tabletWidth,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_vwap'),
      isHidden: windowWidth < tabletWidth,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_supply'),
      isHidden: windowWidth < laptopMediumWidth,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_volume'),
      isHidden: windowWidth < laptopMediumWidth,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: t('crypto_table_change'),
      isHidden: false,
    },
    {
      columnClassNames: 'crypto-table__cell',
      content: '',
      isHidden: false,
    },
  ];

  const bodyRowsContent: (string | JSX.Element)[][] = currentTableData.map((item) => {
    const change =
      typeof item.changePercent24Hr === 'string'
        ? `${parseFloat(item.changePercent24Hr) > 0 ? '+' : ''}${formatFloat(
            item.changePercent24Hr
          )}%`
        : '';
    const addButton = (
      <div className="cryptoTable__cell_button" onClick={onAddCurrency(item)}>
        +
      </div>
    );
    return [
      item.rank,
      item.name,
      formatFloat(item.priceUsd),
      formatFloat(item.marketCapUsd),
      formatFloat(item.vwap24Hr),
      formatFloat(item.supply),
      formatFloat(item.volumeUsd24Hr),
      change,
      addButton,
    ];
  });

  return (
    <>
      {loading && <Preloader />}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && currencies.length ? (
        <div className="stack stack_vertical main">
          <CryptoTable
            headerCells={headerCells}
            bodyRowsContent={bodyRowsContent}
            rowIds={currentTableData.map((item) => item.id)}
            onRowClick={onGoToInfo}
          />
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
