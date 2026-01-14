import Table from '../Table/Table';
import Skeleton from './Skeleton';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton = ({ rows = 5, columns = 4 }: TableSkeletonProps) => {
  return (
    <Table.Container>
      <Table>
        <Table.Head>
          <Table.Row>
            {Array.from({ length: columns }).map((_, index) => (
              <Table.HeaderCell key={index}>
                <Skeleton height="16px" />
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <Table.Row key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Table.Cell key={colIndex}>
                  <Skeleton height="20px" />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Container>
  );
};

export default TableSkeleton;
