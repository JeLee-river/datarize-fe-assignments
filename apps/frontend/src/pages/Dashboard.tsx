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
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>
              <img src="/cart.svg" alt="" className={styles.brandIcon} />
              쇼핑몰 구매 데이터 대시보드
            </h1>
          </div>
          <div className={styles.headerContent}>
            <div className={styles.filterSection}>
              <span className={styles.filterLabel}>기간 선택</span>
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={changeStartDate}
                onEndDateChange={changeEndDate}
              />
            </div>
            <CSVDownloadButton startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </header>
      <main className={styles.dashboard}>
        <PurchaseFrequencyTable startDate={startDate} endDate={endDate} />

        <CustomerList startDate={startDate} endDate={endDate} />
      </main>
    </>
  );
};

export default Dashboard;
