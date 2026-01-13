import { calculatePercentage, formatPriceRangeLabel, parsePriceRange } from '@/utils/format';
import styles from './PurchaseFrequencyTable.module.css';

interface PurchaseFrequency {
  range: string;
  count: number;
}

interface PurchaseFrequencyTableProps {
  data: PurchaseFrequency[];
  isLoading: boolean;
  errorMessage: string | null;
}

const PurchaseFrequencyTable = ({ data, isLoading, errorMessage }: PurchaseFrequencyTableProps) => {
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  if (isLoading || errorMessage) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>가격대별 구매 빈도</h2>
        <div className={styles.loading}>{isLoading ? '데이터를 불러오는 중...' : errorMessage}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>가격대별 구매 빈도</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>가격대</th>
              <th className={styles.tableHeader}>구매 빈도</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const percentage = calculatePercentage(item.count, totalCount);
              const { min, max } = parsePriceRange(item.range);
              const priceRangeText = formatPriceRangeLabel(min, max);

              return (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{priceRangeText}</td>
                  <td className={styles.tableCellRight}>
                    <div className={styles.frequencyCell}>
                      <div className={styles.bar} />
                      <span className={styles.countText}>
                        {item.count}건 ({percentage})
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseFrequencyTable;
