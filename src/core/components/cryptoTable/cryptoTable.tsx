import React, { useMemo, useState } from 'react';
import { CryptoTablePagination } from '../cryptoTablePagination/cryptoTablePagination';
import data from './mock-data.json';

const PageSize = 10;

export const CryptoTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="stack stack_vertical crypto-table__container">
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>VWAP(24Hr)</th>
            <th>Supply</th>
            <th>Volume(24Hr)</th>
            <th>Change(24Hr)</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.rank}</td>
                <td>{item.name}</td>
                <td>{parseFloat(item.priceUsd).toFixed(2)}</td>
                <td>{parseFloat(item.marketCapUsd).toFixed(2)}</td>
                <td>{parseFloat(item.vwap24Hr).toFixed(2)}</td>
                <td>{parseFloat(item.supply).toFixed(2)}</td>
                <td>{parseFloat(item.volumeUsd24Hr).toFixed(2)}</td>
                <td>
                  {typeof item.changePercent24Hr === 'string'
                    ? parseFloat(item.changePercent24Hr).toFixed(2)
                    : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CryptoTablePagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
        siblingCount={1}
      />
    </div>
  );
};
