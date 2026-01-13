import PurchaseFrequencyTable from '@/components/dashboard/PurchaseFrequencyTable';
import DateFilter from '../components/dashboard/DateFilter';
import { useDateRange } from '../hooks/useDateRange';
import styles from './Dashboard.module.css';
import { usePurchaseFrequencyFetch } from '@/hooks/usePurchaseFrequencyFetch';
import CSVDownloadButton from '@/components/dashboard/CSVDownloadButton';

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
        <section className={styles.filterSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>데이터 조회 기간</h2>
            <p className={styles.sectionDescription}>선택한 기간의 데이터가 표시됩니다.</p>
          </div>
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={changeStartDate}
            onEndDateChange={changeEndDate}
          />
        </section>

        <CSVDownloadButton startDate={startDate} endDate={endDate} />

        <PurchaseFrequencyTable data={data} isLoading={isLoading} errorMessage={errorMessage} />
      </main>
    </>
  );
};

export default Dashboard;
