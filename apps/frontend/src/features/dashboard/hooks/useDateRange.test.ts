import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDateRange } from './useDateRange';
import { DEFAULT_DATE_RANGE } from '@/constants/date';

describe('useDateRange', () => {
  it('초기값을 DEFAULT_DATE_RANGE로 설정한다', () => {
    const { result } = renderHook(() => useDateRange());

    expect(result.current.startDate).toBe(DEFAULT_DATE_RANGE.start);
    expect(result.current.endDate).toBe(DEFAULT_DATE_RANGE.end);
  });

  it('startDate를 변경할 수 있다', () => {
    const { result } = renderHook(() => useDateRange());

    act(() => {
      result.current.changeStartDate('2025-11-01');
    });

    expect(result.current.startDate).toBe('2025-11-01');
  });

  it('endDate를 변경할 수 있다', () => {
    const { result } = renderHook(() => useDateRange());

    act(() => {
      result.current.changeEndDate('2025-11-30');
    });

    expect(result.current.endDate).toBe('2025-11-30');
  });
});
