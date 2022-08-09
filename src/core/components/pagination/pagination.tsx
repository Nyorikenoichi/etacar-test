import React from 'react';
import { dots, usePagination } from '../../hooks/usePagination';
import { v4 as uuidv4 } from 'uuid';

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
  const lastPage = paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onChangePage = (pageNumber: number) => () => {
    onPageChange(pageNumber);
  };

  const isFirstPage = () => (currentPage === 1 ? ' pagination__item_disabled' : '');

  const isLastPage = () => (currentPage === lastPage ? ' pagination__item_disabled' : '');

  const isCurrentPage = (pageNumber: string | number) =>
    currentPage === pageNumber ? ' pagination__item_selected' : '';

  return (
    <ul className="pagination">
      <li className={`pagination__item${isFirstPage()}`} onClick={onPrevious}>
        <div className="pagination__arrow pagination__arrow_left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === dots) {
          return (
            <li key={uuidv4()} className="pagination__item pagination__item_dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={uuidv4()}
            className={`pagination__item${isCurrentPage(pageNumber)}`}
            onClick={onChangePage(+pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className={`pagination__item${isLastPage()}`} onClick={onNext}>
        <div className="pagination__arrow pagination__arrow_right" />
      </li>
    </ul>
  );
};
