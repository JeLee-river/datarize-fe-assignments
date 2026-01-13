import type { Customer, Pagination } from '@/api/customers';
import { getCustomers } from '@/api/customers';
import { useEffect, useState } from 'react';

interface UseCustomersFetchParams {
  startDate: string;
  endDate: string;
  name: string;
  sortBy?: 'asc' | 'desc';
  page: number;
  limit: number;
}

const INITIAL_PAGINATION: Pagination = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
};

export const useCustomersFetch = ({
  startDate,
  endDate,
  name,
  sortBy,
  page,
  limit,
}: UseCustomersFetchParams) => {
  const [data, setData] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<Pagination>(INITIAL_PAGINATION);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomersData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await getCustomers({
          from: startDate,
          to: endDate,
          name,
          sortBy,
          page,
          limit,
        });
        setData(response.data);
        setPagination(response.pagination);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : '고객 데이터를 불러오는데 실패했습니다.'
        );
        setData([]);
        setPagination({ ...INITIAL_PAGINATION, page, limit });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomersData();
  }, [startDate, endDate, name, sortBy, page, limit]);

  return { data, pagination, isLoading, errorMessage };
};
