import { useEffect, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { Customer } from '@/api/customers';
import { useCustomersFetch } from '@/hooks/useCustomersFetch';
import { usePagination } from '@/hooks/usePagination';
import Pagination from '@/components/common/Pagination';
import CustomerControls, { SortOption } from './CustomerControls';
import CustomerTable from './CustomerTable';
import styles from './CustomerList.module.css';
import useModal from '@/components/common/Modal/useModal';
import CustomerDetailModal from '../CustomerDetails/CustomerDetailModal';

interface CustomerListProps {
  startDate: string;
  endDate: string;
}

const PAGE_LIMIT = 20;

const CustomerList = ({ startDate, endDate }: CustomerListProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [name, setName] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const { page, changePage, resetPage } = usePagination();
  const { modalRef, openModal, closeModal, isOpen } = useModal({
    onClose: () => setSelectedCustomer(null),
  });

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
    const nextValue = event.target.value as SortOption;
    resetPage();
    setSortOption(nextValue);
  };

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    openModal();
  };

  const total = pagination.total;
  const rangeStart = total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const rangeEnd = total === 0 ? 0 : Math.min(pagination.page * pagination.limit, total);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>고객 목록</h2>
        <CustomerControls
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearchKeyDown={handleSearchKeyDown}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
      </div>

      <CustomerTable
        data={data}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onRowClick={handleRowClick}
      />

      <Pagination
        currentPage={page}
        totalPages={Math.max(pagination.totalPages, 1)}
        onPageChange={changePage}
        totalItems={total}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
      />

      <CustomerDetailModal
        isOpen={isOpen}
        modalRef={modalRef}
        onClose={closeModal}
        customer={selectedCustomer}
        startDate={startDate}
        endDate={endDate}
      />
    </section>
  );
};

export default CustomerList;
