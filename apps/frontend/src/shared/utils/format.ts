export const formatPrice = (value: number) => {
  return value.toLocaleString('ko-KR');
};

export const calculatePercentage = (value: number, total: number, decimals: number = 1) => {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(decimals)}%`;
};
