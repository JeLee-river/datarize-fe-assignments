import { usePurchasesFetch } from '@/hooks/usePurchasesFetch';
import { downloadCSV } from '@/utils/csv';
import styles from './CSVDownloadButton.module.css';

interface CSVDownloadButtonProps {
  startDate: string;
  endDate: string;
}

const CSVDownloadButton = ({ startDate, endDate }: CSVDownloadButtonProps) => {
  const { fetchPurchasesData, isLoading, errorMessage } = usePurchasesFetch({ startDate, endDate });

  const handleDownloadClick = async () => {
    const purchases = await fetchPurchasesData();
    if (purchases) {
      downloadCSV(purchases, `구매데이터_${startDate}-${endDate}`);
    } else {
      console.error(errorMessage);
      alert('CSV 다운로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <button className={styles.button} onClick={handleDownloadClick} disabled={isLoading}>
      <span className={styles.icon}>⬇</span>
      {isLoading ? '다운로드 중...' : '구매 데이터 내려받기 (*.csv)'}
    </button>
  );
};

export default CSVDownloadButton;
