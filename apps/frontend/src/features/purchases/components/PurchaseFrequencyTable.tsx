import { calculatePercentage } from '@/shared/utils/format';
import { formatPriceRangeLabel, parsePriceRange } from '@/features/purchases/utils/format';
import { usePurchaseFrequencyFetch } from '@/features/purchases/hooks/usePurchaseFrequencyFetch';
import Table from '@/shared/components/Table/Table';
import TableSkeleton from '@/shared/components/Skeleton/TableSkeleton';
import styles from './PurchaseFrequencyTable.module.css';

interface PurchaseFrequencyTableProps {
  startDate: string;
  endDate: string;
}

const PurchaseFrequencyTable = ({ startDate, endDate }: PurchaseFrequencyTableProps) => {
  const { data, isLoading, errorMessage } = usePurchaseFrequencyFetch({ startDate, endDate });
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  if (errorMessage) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>가격대별 구매 빈도</h2>
        <div className={styles.loading}>{errorMessage}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>가격대별 구매 빈도</h2>
        <TableSkeleton rows={6} columns={3} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>가격대별 구매 빈도</h2>

      <Table.Container>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>가격대</Table.HeaderCell>
              <Table.HeaderCell>구매 빈도 (건)</Table.HeaderCell>
              <Table.HeaderCell align="right">비율 (%)</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((item, index) => {
              const percentage = calculatePercentage(item.count, totalCount);
              const { min, max } = parsePriceRange(item.range);
              const priceRangeText = formatPriceRangeLabel(min, max);

              return (
                <Table.Row key={index}>
                  <Table.Cell>{priceRangeText}</Table.Cell>
                  <Table.Cell>
                    <div className={styles.frequencyCell}>
                      <div className={styles.bar} />
                      <span className={styles.countText}>{item.count}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell align="right">{percentage}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Container>
    </div>
  );
};

export default PurchaseFrequencyTable;
