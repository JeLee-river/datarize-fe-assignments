import styles from './DateFilter.module.css';

const DEFAULT_DATE = {
  start: '2025-10-01',
  end: '2025-12-31',
};

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
          onChange={(e) => onStartDateChange(e.target.value)}
          min={DEFAULT_DATE.start}
          max={endDate}
        />
      </div>

      <div className={styles.dateFilterField}>
        <label htmlFor="end-date" className={styles.dateFilterLabel}>
          종료일
        </label>
        <input
          type="date"
          id="end-date"
          className={styles.dateFilterInput}
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          min={startDate}
          max={DEFAULT_DATE.end}
        />
      </div>
    </div>
  );
};

export default DateFilter;
