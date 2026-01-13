export const formatPrice = (value: number) => {
  return value.toLocaleString('ko-KR');
};

export const calculatePercentage = (value: number, total: number, decimals: number = 1) => {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(decimals)}%`;
};

export const parsePriceRange = (range: string) => {
  const [min, max] = range.split(' - ').map(Number);
  if (isNaN(min) || isNaN(max)) {
    return { min: 0, max: 0 };
  }

  return {
    min: Number.isFinite(min) ? min : null,
    max: Number.isFinite(max) ? max : null,
  };
};

export const formatPriceRangeLabel = (min: number | null, max: number | null) => {
  const minLabel = min !== null && min > 0 ? `${formatPrice(min)} 이상` : '';
  const maxLabel = max !== null ? `${formatPrice(max)} 이하` : '';

  return [minLabel, maxLabel].join(' ').trim();
};
