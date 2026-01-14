import PurchaseFrequencyTable from '@/features/purchases/components/PurchaseFrequencyTable';
import DateFilter from '@/features/dashboard/components/DateFilter';
import { useDateRange } from '@/features/dashboard/hooks/useDateRange';
import styles from './Dashboard.module.css';
import CSVDownloadButton from '@/features/dashboard/components/CSVDownloadButton';
import CustomerList from '@/features/customers/components/CustomerList/CustomerList';

const Dashboard = () => {
  const { startDate, endDate, changeStartDate, changeEndDate } = useDateRange();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.title}>
            <img src="/cart.svg" alt="" className={styles.brandIcon} />
            쇼핑몰 구매 데이터 대시보드
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
          <div className={styles.filterControls}>
            <DateFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={changeStartDate}
              onEndDateChange={changeEndDate}
            />
            <CSVDownloadButton startDate={startDate} endDate={endDate} />
          </div>
        </section>

        <PurchaseFrequencyTable startDate={startDate} endDate={endDate} />

        <CustomerList startDate={startDate} endDate={endDate} />
      </main>
    </>
  );
};

export default Dashboard;
