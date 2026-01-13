import { formatPrice } from '@/shared/utils/format';

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

export const formatPurchaseDate = (value: string) => {
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) return value;

  return `${year}. ${Number(month)}. ${Number(day)}.`;
};
