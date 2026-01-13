import { useCallback, useState } from 'react';

export const usePagination = () => {
  const [page, setPage] = useState(1);

  const changePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page,
    changePage,
    resetPage,
  };
};
