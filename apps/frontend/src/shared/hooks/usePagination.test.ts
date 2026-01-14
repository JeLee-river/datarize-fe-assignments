import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('초기 페이지를 1로 설정한다', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.page).toBe(1);
  });

  it('페이지를 변경할 수 있다', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.changePage(3);
    });

    expect(result.current.page).toBe(3);
  });

  it('페이지를 1로 리셋할 수 있다', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.changePage(5);
      result.current.resetPage();
    });

    expect(result.current.page).toBe(1);
  });
});
