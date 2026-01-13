import { useState, useEffect } from 'react';
import { getPurchaseFrequency } from '../api/purchases';

interface PurchaseFrequency {
  range: string;
  count: number;
}

interface UsePurchaseFrequencyFetchParams {
  startDate: string;
  endDate: string;
}

export const usePurchaseFrequencyFetch = ({
  startDate,
  endDate,
}: UsePurchaseFrequencyFetchParams) => {
  const [data, setData] = useState<PurchaseFrequency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const result = await getPurchaseFrequency({
          from: startDate,
          to: endDate,
        });
        setData(result);
        console.log(result);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : '구매 빈도 데이터를 불러오는데 실패했습니다.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return { data, isLoading, errorMessage };
};
