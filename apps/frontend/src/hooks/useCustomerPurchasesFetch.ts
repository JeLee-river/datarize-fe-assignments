import { useEffect, useState } from 'react';
import { CustomerPurchase, getCustomerPurchases } from '@/api/customers';

interface UseCustomerPurchasesFetchParams {
  customerId: number | null;
  startDate: string;
  endDate: string;
  enabled?: boolean;
}

export const useCustomerPurchasesFetch = ({
  customerId,
  startDate,
  endDate,
  enabled = true,
}: UseCustomerPurchasesFetchParams) => {
  const [data, setData] = useState<CustomerPurchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !customerId) {
      setData([]);
      setIsLoading(false);
      setErrorMessage(null);
      return;
    }

    const fetchCustomerPurchasesData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await getCustomerPurchases(customerId, {
          from: startDate,
          to: endDate,
        });
        setData(response);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : '구매 내역을 불러오는데 실패했습니다.'
        );
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerPurchasesData();
  }, [customerId, startDate, endDate, enabled]);

  return { data, isLoading, errorMessage };
};
