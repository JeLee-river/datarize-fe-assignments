import { DEFAULT_DATE_RANGE } from '@/constants/date';
import styles from './DateFilter.module.css';

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DateFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateFilterProps) => {
  return (
    <div className={styles.dateFilter}>
      <div className={styles.dateFilterField}>
        <label htmlFor="start-date" className={styles.dateFilterLabel}>
          시작일
        </label>
        <input
          type="date"
          id="start-date"
          className={styles.dateFilterInput}
          value={startDate}
          onChange={(event) => onStartDateChange(event.target.value)}
          min={DEFAULT_DATE_RANGE.start}
          max={endDate}
        />
      </div>

      <span className={styles.dateDivider} aria-hidden="true">
        ~
      </span>

      <div className={styles.dateFilterField}>
        <label htmlFor="end-date" className={styles.dateFilterLabel}>
          종료일
        </label>
        <input
          type="date"
          id="end-date"
          className={styles.dateFilterInput}
          value={endDate}
          onChange={(event) => onEndDateChange(event.target.value)}
          min={startDate}
          max={DEFAULT_DATE_RANGE.end}
        />
      </div>
    </div>
  );
};

export default DateFilter;
