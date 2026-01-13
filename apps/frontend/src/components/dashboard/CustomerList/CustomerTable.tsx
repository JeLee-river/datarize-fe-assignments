import { Customer } from '@/api/customers';
import { formatPrice } from '@/utils/format';
import styles from './CustomerTable.module.css';

interface CustomerTableProps {
  data: Customer[];
  isLoading: boolean;
  errorMessage: string | null;
}

const CustomerTable = ({ data, isLoading, errorMessage }: CustomerTableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>고객 ID</th>
            <th className={styles.tableHeader}>이름</th>
            <th className={styles.tableHeaderCenter}>총 구매 횟수 (회)</th>
            <th className={styles.tableHeaderRight}>총 구매 금액 (원)</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className={styles.stateCell} colSpan={4}>
                데이터를 불러오는 중...
              </td>
            </tr>
          ) : errorMessage ? (
            <tr>
              <td className={`${styles.stateCell} ${styles.stateCellError}`} colSpan={4}>
                {errorMessage}
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td className={styles.stateCell} colSpan={4}>
                표시할 고객 데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((customer) => (
              <tr key={customer.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{customer.id}</td>
                <td className={styles.tableCell}>{customer.name}</td>
                <td className={styles.tableCellCenter}>{customer.count}</td>
                <td className={styles.tableCellRight}>{formatPrice(customer.totalAmount)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
