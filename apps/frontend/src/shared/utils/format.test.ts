import { describe, it, expect } from 'vitest';
import { formatPrice, calculatePercentage } from './format';

describe('formatPrice', () => {
  it('숫자를 한국 통화 형식으로 변환한다', () => {
    expect(formatPrice(1000)).toBe('1,000');
    expect(formatPrice(1_000_000)).toBe('1,000,000');
    expect(formatPrice(50_000)).toBe('50,000');
  });

  it('0을 올바르게 포맷한다', () => {
    expect(formatPrice(0)).toBe('0');
  });

  it('음수를 올바르게 포맷한다', () => {
    expect(formatPrice(-1000)).toBe('-1,000');
  });

  it('소수점이 있는 숫자를 올바르게 포맷한다', () => {
    expect(formatPrice(1234.56)).toBe('1,234.56');
  });
});

describe('calculatePercentage', () => {
  it('비율을 올바르게 계산한다', () => {
    expect(calculatePercentage(25, 100)).toBe('25.0%');
    expect(calculatePercentage(50, 200)).toBe('25.0%');
    expect(calculatePercentage(1, 3)).toBe('33.3%');
  });

  it('total이 0일 때 0%를 반환한다', () => {
    expect(calculatePercentage(10, 0)).toBe('0%');
  });

  it('소수점 자릿수를 지정할 수 있다', () => {
    expect(calculatePercentage(1, 3, 0)).toBe('33%');
    expect(calculatePercentage(1, 3, 2)).toBe('33.33%');
    expect(calculatePercentage(1, 3, 3)).toBe('33.333%');
  });

  it('100%를 올바르게 계산한다', () => {
    expect(calculatePercentage(100, 100)).toBe('100.0%');
  });

  it('0%를 올바르게 계산한다', () => {
    expect(calculatePercentage(0, 100)).toBe('0.0%');
  });
});
