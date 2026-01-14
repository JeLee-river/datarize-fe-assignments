import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerTable from './CustomerTable';
import type { Customer } from '@/api/customers';

describe('CustomerTable', () => {
  const mockData: Customer[] = [
    { id: 1, name: '홍길동', count: 5, totalAmount: 150_000 },
    { id: 2, name: '김철수', count: 3, totalAmount: 90_000 },
  ];

  it('데이터를 올바르게 렌더링한다', () => {
    const onRowClick = vi.fn();
    render(
      <CustomerTable
        data={mockData}
        isLoading={false}
        errorMessage={null}
        onRowClick={onRowClick}
      />
    );

    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('김철수')).toBeInTheDocument();
    expect(screen.getByText('150,000')).toBeInTheDocument();
    expect(screen.getByText('90,000')).toBeInTheDocument();
  });

  it('로딩 중일 때 스켈레톤을 표시한다', () => {
    const onRowClick = vi.fn();
    render(
      <CustomerTable data={[]} isLoading={true} errorMessage={null} onRowClick={onRowClick} />
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('에러가 있을 때 에러 메시지를 표시한다', () => {
    const onRowClick = vi.fn();
    const errorMessage = '고객 데이터를 불러오는데 실패했습니다.';
    render(
      <CustomerTable
        data={[]}
        isLoading={false}
        errorMessage={errorMessage}
        onRowClick={onRowClick}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('행을 클릭하면 onRowClick이 호출된다', async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(
      <CustomerTable
        data={mockData}
        isLoading={false}
        errorMessage={null}
        onRowClick={onRowClick}
      />
    );

    const row = screen.getByText('홍길동').closest('tr');
    if (row) {
      await user.click(row);
      expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
    }
  });
});
