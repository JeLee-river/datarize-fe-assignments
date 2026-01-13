import type { Ref } from 'react';
import Modal from '@/shared/components/Modal/Modal';
import type { Customer } from '@/api/customers';
import { formatPrice } from '@/shared/utils/format';
import { formatPurchaseDate } from '@/features/purchases/utils/format';
import styles from './CustomerDetailModal.module.css';
import { useCustomerPurchasesFetch } from '@/features/customers/hooks/useCustomerPurchasesFetch';

interface CustomerDetailModalProps {
  isOpen: boolean;
  modalRef: Ref<HTMLDivElement | null>;
  onClose: () => void;
  customer: Customer | null;
  startDate: string;
  endDate: string;
}

const CustomerDetailModal = ({
  isOpen,
  modalRef,
  onClose,
  customer,
  startDate,
  endDate,
}: CustomerDetailModalProps) => {
  const { data, isLoading, errorMessage } = useCustomerPurchasesFetch({
    customerId: customer?.id ?? null,
    startDate,
    endDate,
    enabled: isOpen,
  });

  if (!customer) return null;

  const purchaseDates = new Set(data.map((item) => item.date));
  const totalCount = purchaseDates.size;
  const totalAmount = data.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalCountLabel = isLoading ? '-' : `${totalCount}회`;
  const totalAmountLabel = isLoading ? '-' : `${formatPrice(totalAmount)}원`;

  return (
    <Modal modalRef={modalRef} closeModal={onClose} isOpen={isOpen}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{customer.name} - 구매 내역</h2>
          <p className={styles.subtitle}>고객의 전체 구매 내역을 확인하실 수 있습니다.</p>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>총 구매 횟수</span>
            <strong className={styles.summaryValue}>{totalCountLabel}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>총 구매 금액</span>
            <strong className={styles.summaryValue}>{totalAmountLabel}</strong>
          </div>
        </div>

        <div className={styles.list}>
          {isLoading ? (
            <p className={styles.stateMessage}>구매 내역을 불러오는 중...</p>
          ) : errorMessage ? (
            <p className={`${styles.stateMessage} ${styles.stateMessageError}`}>{errorMessage}</p>
          ) : data.length === 0 ? (
            <p className={styles.stateMessage}>구매 내역이 없습니다.</p>
          ) : (
            data.map((purchase, index) => (
              <div
                key={`${purchase.date}-${purchase.product}-${index}`}
                className={styles.purchaseCard}
              >
                <img
                  src={purchase.imgSrc}
                  alt={purchase.product}
                  className={styles.purchaseImage}
                />
                <div className={styles.purchaseInfo}>
                  <div className={styles.purchaseHeader}>
                    <div className={styles.purchaseTitleWrapper}>
                      <h3 className={styles.productName}>{purchase.product}</h3>
                      <p className={styles.purchaseDate}>
                        구매 일: {formatPurchaseDate(purchase.date)}
                      </p>
                    </div>
                    <div className={styles.purchaseMeta}>
                      <span className={styles.price}>{formatPrice(purchase.price)}원</span>
                      <span className={styles.quantity}>수량: {purchase.quantity}개</span>
                    </div>
                  </div>
                  <div className={styles.divider} />
                  <p className={styles.subtotal}>
                    총 금액: {formatPrice(purchase.price * purchase.quantity)}원
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetailModal;
