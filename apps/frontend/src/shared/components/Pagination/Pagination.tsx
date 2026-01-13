import { useMemo } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  rangeStart?: number;
  rangeEnd?: number;
  showSummary?: boolean;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <img src="/chevron-left.svg" alt="" className={styles.changePageIcon} />
          이전
        </button>
        <div className={styles.pageNumbers}>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={pageNumber === currentPage ? styles.pageNumberActive : styles.pageNumber}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
        >
          다음
          <img src="/chevron-right.svg" alt="" className={styles.changePageIcon} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
