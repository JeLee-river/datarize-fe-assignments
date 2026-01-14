import { describe, it, expect } from 'vitest';
import { parsePriceRange, formatPriceRangeLabel, formatPurchaseDate } from './format';

describe('parsePriceRange', () => {
  it('정상적인 가격 범위 문자열을 파싱한다', () => {
    expect(parsePriceRange('0 - 50000')).toEqual({ min: 0, max: 50_000 });
    expect(parsePriceRange('50000 - 100000')).toEqual({ min: 50_000, max: 100_000 });
    expect(parsePriceRange('100000 - 150000')).toEqual({ min: 100_000, max: 150_000 });
  });

  it('잘못된 형식의 문자열은 0, 0을 반환한다', () => {
    expect(parsePriceRange('잘못된 문자열')).toEqual({ min: 0, max: 0 });
    expect(parsePriceRange('abc - def')).toEqual({ min: 0, max: 0 });
    expect(parsePriceRange('')).toEqual({ min: 0, max: 0 });
  });

  it('부분적으로 유효한 값을 처리한다', () => {
    const result = parsePriceRange('100 - 잘못된 문자열');
    expect(result).toEqual({ min: 0, max: 0 });
  });
});

describe('formatPriceRangeLabel', () => {
  it('min과 max가 모두 있을 때 올바르게 포맷한다', () => {
    expect(formatPriceRangeLabel(50_000, 100_000)).toBe('50,000 이상 100,000 이하');
    expect(formatPriceRangeLabel(0, 500_00)).toBe('50,000 이하');
  });

  it('min만 있을 때 올바르게 포맷한다', () => {
    expect(formatPriceRangeLabel(100_000, null)).toBe('100,000 이상');
  });

  it('max만 있을 때 올바르게 포맷한다', () => {
    expect(formatPriceRangeLabel(null, 50_000)).toBe('50,000 이하');
  });

  it('min이 0일 때 min 레이블을 표시하지 않는다', () => {
    expect(formatPriceRangeLabel(0, 50_000)).toBe('50,000 이하');
  });

  it('둘 다 null일 때 빈 문자열을 반환한다', () => {
    expect(formatPriceRangeLabel(null, null)).toBe('');
  });
});

describe('formatPurchaseDate', () => {
  it('날짜 문자열을 한국 형식으로 변환한다', () => {
    expect(formatPurchaseDate('2025-10-01')).toBe('2025. 10. 1.');
    expect(formatPurchaseDate('2025-12-31')).toBe('2025. 12. 31.');
    expect(formatPurchaseDate('2025-01-05')).toBe('2025. 1. 5.');
  });

  it('월과 일의 앞 0을 제거한다', () => {
    expect(formatPurchaseDate('2025-01-01')).toBe('2025. 1. 1.');
    expect(formatPurchaseDate('2025-09-09')).toBe('2025. 9. 9.');
  });

  it('잘못된 형식의 날짜는 원본을 반환한다', () => {
    expect(formatPurchaseDate('유효안함')).toBe('유효안함');
    expect(formatPurchaseDate('2025-10')).toBe('2025-10');
    expect(formatPurchaseDate('')).toBe('');
  });
});
