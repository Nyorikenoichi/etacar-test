import { renderHook } from '@testing-library/react-hooks';
import { usePagination } from './usePagination';

it('usePagination hook', () => {
  let { result } = renderHook(() =>
    usePagination({ totalCount: 70, pageSize: 14, siblingCount: 1, currentPage: 1 })
  );
  expect(result.current).toEqual([1, 2, 3, 4, 5]);

  ({ result } = renderHook(() =>
    usePagination({ totalCount: 100, pageSize: 14, siblingCount: 1, currentPage: 1 })
  ));
  expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 8]);

  ({ result } = renderHook(() =>
    usePagination({ totalCount: 100, pageSize: 14, siblingCount: 1, currentPage: 4 })
  ));
  expect(result.current).toEqual([1, '...', 3, 4, 5, '...', 8]);

  ({ result } = renderHook(() =>
    usePagination({ totalCount: 100, pageSize: 14, siblingCount: 1, currentPage: 6 })
  ));
  expect(result.current).toEqual([1, '...', 4, 5, 6, 7, 8]);
});
