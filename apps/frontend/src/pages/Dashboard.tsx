import PurchaseFrequencyTable from '@/components/dashboard/PurchaseFrequencyTable';
import DateFilter from '../components/dashboard/DateFilter';
import { useDateRange } from '../hooks/useDateRange';
import styles from './Dashboard.module.css';
import { usePurchaseFrequencyFetch } from '@/hooks/usePurchaseFrequencyFetch';

const Dashboard = () => {
  const { startDate, endDate, changeStartDate, changeEndDate } = useDateRange();
  const { data, isLoading, errorMessage } = usePurchaseFrequencyFetch({ startDate, endDate });

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
        <PurchaseFrequencyTable data={data} isLoading={isLoading} errorMessage={errorMessage} />
      </main>
    </>
  );
};

export default Dashboard;
