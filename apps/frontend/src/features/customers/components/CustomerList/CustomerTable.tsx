import type { KeyboardEvent } from 'react';
import type { Customer } from '@/api/customers';
import { formatPrice } from '@/shared/utils/format';
import Table from '@/shared/components/Table/Table';
import styles from './CustomerTable.module.css';

interface CustomerTableProps {
  data: Customer[];
  isLoading: boolean;
  errorMessage: string | null;
  onRowClick: (customer: Customer) => void;
}

const CustomerTable = ({ data, isLoading, errorMessage, onRowClick }: CustomerTableProps) => {
  const handleRowKeyDown = (customer: Customer, event: KeyboardEvent) => {
    if (!onRowClick || event.key !== 'Enter') return;
    event.preventDefault();

    onRowClick(customer);
  };

  return (
    <Table.Container className={styles.tableWrapper}>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>고객 ID</Table.HeaderCell>
            <Table.HeaderCell>이름</Table.HeaderCell>
            <Table.HeaderCell align="center">총 구매 횟수 (회)</Table.HeaderCell>
            <Table.HeaderCell align="right">총 구매 금액 (원)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <td className={styles.stateCell} colSpan={4}>
                데이터를 불러오는 중...
              </td>
            </Table.Row>
          ) : errorMessage ? (
            <Table.Row>
              <td className={`${styles.stateCell} ${styles.stateCellError}`} colSpan={4}>
                {errorMessage}
              </td>
            </Table.Row>
          ) : data.length === 0 ? (
            <Table.Row>
              <td className={styles.stateCell} colSpan={4}>
                표시할 고객 데이터가 없습니다.
              </td>
            </Table.Row>
          ) : (
            data.map((customer) => (
              <Table.Row
                key={customer.id}
                onRowClick={() => onRowClick?.(customer)}
                onKeyDown={(event) => handleRowKeyDown(customer, event)}
                tabIndex={0}
                role="button"
              >
                <Table.Cell>{customer.id}</Table.Cell>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell align="center">{customer.count}</Table.Cell>
                <Table.Cell align="right">{formatPrice(customer.totalAmount)}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </Table.Container>
  );
};

export default CustomerTable;
