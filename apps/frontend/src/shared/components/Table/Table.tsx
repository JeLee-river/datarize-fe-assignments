import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from 'react';
import styles from './Table.module.css';

type Align = 'left' | 'center' | 'right';

const alignClassMap: Record<Align, string | undefined> = {
  left: undefined,
  center: styles.alignCenter,
  right: styles.alignRight,
};

const TableContainer = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${styles.container} ${className ?? ''}`} {...props}>
      {children}
    </div>
  );
};

const TableRoot = ({ className, children, ...props }: TableHTMLAttributes<HTMLTableElement>) => {
  return (
    <table className={`${styles.table} ${className ?? ''}`} {...props}>
      {children}
    </table>
  );
};

const TableHead = ({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead {...props}>{children}</thead>;
};

const TableBody = ({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
  return <tbody {...props}>{children}</tbody>;
};

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  onRowClick?: () => void;
}

const TableRow = ({ className, onRowClick, children, ...props }: TableRowProps) => {
  return (
    <tr
      className={`${styles.row} ${onRowClick ? styles.rowClickable : ''} ${className ?? ''}`}
      onClick={onRowClick}
      {...props}
    >
      {children}
    </tr>
  );
};

interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: Align;
}

const TableHeaderCell = ({
  align = 'left',
  className,
  children,
  ...props
}: TableHeaderCellProps) => {
  const alignClass = alignClassMap[align];
  return (
    <th className={`${styles.headerCell} ${alignClass ?? ''} ${className ?? ''}`} {...props}>
      {children}
    </th>
  );
};

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: Align;
}

const TableCell = ({ align = 'left', className, children, ...props }: TableCellProps) => {
  const alignClass = alignClassMap[align];
  return (
    <td className={`${styles.cell} ${alignClass ?? ''} ${className ?? ''}`} {...props}>
      {children}
    </td>
  );
};

type TableComponent = typeof TableRoot & {
  Container: typeof TableContainer;
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  HeaderCell: typeof TableHeaderCell;
  Cell: typeof TableCell;
};

const Table = TableRoot as TableComponent;
Table.Container = TableContainer;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;

export default Table;
