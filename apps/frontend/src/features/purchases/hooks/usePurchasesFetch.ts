import type { PurchaseResponse } from '@/api/purchases';
import { getPurchases } from '@/api/purchases';
import { useState } from 'react';

interface UsePurchasesFetchParams {
  startDate: string;
  endDate: string;
}

export const usePurchasesFetch = ({ startDate, endDate }: UsePurchasesFetchParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPurchasesData = async (): Promise<PurchaseResponse | undefined> => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await getPurchases({
        from: startDate,
        to: endDate,
      });
      return result;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '구매 데이터를 불러오는데 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchPurchasesData, isLoading, errorMessage };
};
