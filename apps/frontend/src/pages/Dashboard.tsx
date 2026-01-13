import DateFilter from '../components/dashboard/DateFilter';
import { useDateRange } from '../hooks/useDateRange';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { startDate, endDate, changeStartDate, changeEndDate } = useDateRange();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.title}>
            <span className={styles.brandIcon}>🛒</span>쇼핑몰 구매 데이터 대시보드
          </h1>
          <p className={styles.subtitle}>2025년 10월~12월 구매 데이터 분석</p>
        </div>
      </header>
      <main className={styles.dashboard}>
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={changeStartDate}
          onEndDateChange={changeEndDate}
        />
      </main>
    </>
  );
};

export default Dashboard;
