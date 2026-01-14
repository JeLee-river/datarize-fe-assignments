import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PurchaseFrequencyTable from './PurchaseFrequencyTable';
import type { PurchaseFrequency } from '@/api/purchases';

vi.mock('@/features/purchases/hooks/usePurchaseFrequencyFetch');

import { usePurchaseFrequencyFetch } from '@/features/purchases/hooks/usePurchaseFrequencyFetch';

describe('PurchaseFrequencyTable', () => {
  const mockData: PurchaseFrequency[] = [
    { range: '0 - 50000', count: 10 },
    { range: '50000 - 100000', count: 20 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('제목을 렌더링한다', () => {
    vi.mocked(usePurchaseFrequencyFetch).mockReturnValue({
      data: mockData,
      isLoading: false,
      errorMessage: null,
    });

    render(<PurchaseFrequencyTable startDate="2024-01-01" endDate="2024-12-31" />);

    expect(screen.getByText('가격대별 구매 빈도')).toBeInTheDocument();
  });

  it('로딩 중일 때 스켈레톤을 표시한다', () => {
    vi.mocked(usePurchaseFrequencyFetch).mockReturnValue({
      data: [],
      isLoading: true,
      errorMessage: null,
    });

    render(<PurchaseFrequencyTable startDate="2024-01-01" endDate="2024-12-31" />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('에러가 있을 때 에러 메시지를 표시한다', () => {
    const errorMessage = '데이터를 불러오는데 실패했습니다.';
    vi.mocked(usePurchaseFrequencyFetch).mockReturnValue({
      data: [],
      isLoading: false,
      errorMessage,
    });

    render(<PurchaseFrequencyTable startDate="2024-01-01" endDate="2024-12-31" />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('데이터를 올바르게 렌더링한다', () => {
    vi.mocked(usePurchaseFrequencyFetch).mockReturnValue({
      data: mockData,
      isLoading: false,
      errorMessage: null,
    });

    render(<PurchaseFrequencyTable startDate="2024-01-01" endDate="2024-12-31" />);

    expect(screen.getByText('50,000 이하')).toBeInTheDocument();
    expect(screen.getByText('50,000 이상 100,000 이하')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });
});
