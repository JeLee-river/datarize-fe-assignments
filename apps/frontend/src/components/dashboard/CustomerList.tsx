import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { useCustomersFetch } from '@/hooks/useCustomersFetch';
import { usePagination } from '@/hooks/usePagination';
import { formatPrice } from '@/utils/format';
import styles from './CustomerList.module.css';

interface CustomerListProps {
  startDate: string;
  endDate: string;
}

const PAGE_LIMIT = 20;

const CustomerList = ({ startDate, endDate }: CustomerListProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [name, setName] = useState('');
  const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default');
  const { page, changePage, resetPage } = usePagination();

  useEffect(() => {
    resetPage();
  }, [startDate, endDate, resetPage]);

  const sortBy = sortOption === 'default' ? undefined : sortOption;

  const { data, pagination, isLoading, errorMessage } = useCustomersFetch({
    startDate,
    endDate,
    name,
    sortBy,
    page,
    limit: PAGE_LIMIT,
  });

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const nextName = searchInput.trim();
    resetPage();
    setName(nextName);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.target.value as 'default' | 'asc' | 'desc';
    resetPage();
    setSortOption(nextValue);
  };

  const totalPages = Math.max(pagination.totalPages, 1);
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );
  const total = pagination.total;
  const rangeStart = total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const rangeEnd = total === 0 ? 0 : Math.min(pagination.page * pagination.limit, total);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>고객 목록</h2>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon} aria-hidden="true">
              <img src="/search.svg" alt="" className={styles.searchIconImage} />
            </span>
            <input
              type="text"
              placeholder="고객 이름 검색..."
              className={styles.searchInput}
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          <label className={styles.sortFilter}>
            <select className={styles.sortSelect} value={sortOption} onChange={handleSortChange}>
              <option value="default">기본 (ID 오름차순)</option>
              <option value="asc">구매 금액 낮은순</option>
              <option value="desc">구매 금액 높은순</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>고객 ID</th>
              <th className={styles.tableHeader}>이름</th>
              <th className={styles.tableHeaderCenter}>총 구매 횟수 (회)</th>
              <th className={styles.tableHeaderRight}>총 구매 금액 (원)</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className={styles.stateCell} colSpan={4}>
                  데이터를 불러오는 중...
                </td>
              </tr>
            ) : errorMessage ? (
              <tr>
                <td className={`${styles.stateCell} ${styles.stateCellError}`} colSpan={4}>
                  {errorMessage}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td className={styles.stateCell} colSpan={4}>
                  표시할 고객 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              data.map((customer) => (
                <tr key={customer.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{customer.id}</td>
                  <td className={styles.tableCell}>{customer.name}</td>
                  <td className={styles.tableCellCenter}>{customer.count}</td>
                  <td className={styles.tableCellRight}>{formatPrice(customer.totalAmount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationWrapper}>
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => changePage(page - 1)}
            disabled={page <= 1}
          >
            ‹ 이전
          </button>
          <div className={styles.pageNumbers}>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={pageNumber === page ? styles.pageNumberActive : styles.pageNumber}
                onClick={() => changePage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => changePage(page + 1)}
            disabled={page >= totalPages || totalPages === 0}
          >
            다음 ›
          </button>
        </div>
        <p className={styles.paginationSummary}>
          전체 {total}명 중 {rangeStart} - {rangeEnd}명
        </p>
      </div>
    </section>
  );
};

export default CustomerList;
