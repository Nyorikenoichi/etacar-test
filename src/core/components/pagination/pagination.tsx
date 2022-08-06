import React from 'react';
import { dots, usePagination } from '../../hooks/usePagination';

interface CryptoTablePaginationProps {
  onPageChange: (x: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
}: CryptoTablePaginationProps): JSX.Element | null => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination">
      <li
        className={`pagination__item${
          currentPage === 1 ? ' pagination__item_disabled' : ''
        }`}
        onClick={onPrevious}
      >
        <div className="pagination__arrow pagination__arrow_left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === dots) {
          return (
            <li className="pagination__item pagination__item_dots">&#8230;</li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={`pagination__item${
              currentPage === pageNumber ? ' pagination__item_selected' : ''
            }`}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination__item${
          currentPage === lastPage ? ' pagination__item_disabled' : ''
        }`}
        onClick={onNext}
      >
        <div className="pagination__arrow pagination__arrow_right" />
      </li>
    </ul>
  );
};
