const escapeCSVValue = (value: unknown): string => {
  const stringValue = String(value ?? '');
  if (stringValue.includes(',') || stringValue.includes('"') || /[\r\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

const convertToCSV = <T extends object>(data: T[]): string => {
  if (data.length === 0) return '';

  const firstRow = data[0];
  const headers = Object.keys(firstRow) as Array<keyof T>;
  const csvHeaders = headers.map((header) => escapeCSVValue(String(header))).join(',');

  const csvRows = data.map((row) => headers.map((header) => escapeCSVValue(row[header])).join(','));

  return [csvHeaders, ...csvRows].join('\n');
};

const createDownloadLink = (content: string, filename: string): void => {
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.download = `${filename}.csv`;
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const downloadCSV = <T extends object>(data: T[], filename: string): void => {
  if (!data || data.length === 0) {
    alert('다운로드할 데이터가 없습니다.');
    return;
  }

  const csvContent = convertToCSV(data);
  createDownloadLink(csvContent, filename);
};
