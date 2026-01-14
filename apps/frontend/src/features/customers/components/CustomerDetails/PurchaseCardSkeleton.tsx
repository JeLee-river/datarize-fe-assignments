import Skeleton from '@/shared/components/Skeleton/Skeleton';
import styles from './CustomerDetailModal.module.css';

const PurchaseCardSkeleton = () => {
  return (
    <div className={styles.purchaseCard}>
      <Skeleton width="140px" height="140px" borderRadius="16px" />
      <div className={styles.purchaseInfo}>
        <div className={styles.purchaseTop}>
          <Skeleton width="60%" height="24px" />
          <Skeleton width="80px" height="16px" />
        </div>
        <div className={styles.purchaseBottom}>
          <div className={styles.infoRow}>
            <Skeleton width="44px" height="16px" />
            <Skeleton width="84px" height="16px" />
          </div>
          <div className={styles.infoRow}>
            <Skeleton width="44px" height="16px" />
            <Skeleton width="84px" height="16px" />
          </div>
          <div className={styles.totalRow}>
            <Skeleton width="64px" height="20px" />
            <Skeleton width="100px" height="20px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCardSkeleton;
