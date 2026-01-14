import type { Ref } from 'react';
import Modal from '@/shared/components/Modal/Modal';
import type { Customer } from '@/api/customers';
import { formatPrice } from '@/shared/utils/format';
import { formatPurchaseDate } from '@/features/purchases/utils/format';
import styles from './CustomerDetailModal.module.css';
import { useCustomerPurchasesFetch } from '@/features/customers/hooks/useCustomerPurchasesFetch';
import PurchaseCardSkeleton from './PurchaseCardSkeleton';
import Skeleton from '@/shared/components/Skeleton/Skeleton';

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

  return (
    <Modal modalRef={modalRef} closeModal={onClose} isOpen={isOpen}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{customer.name} - 구매 내역</h2>
          <p className={styles.subtitle}>
            조회 기간: {formatPurchaseDate(startDate)} ~ {formatPurchaseDate(endDate)}
          </p>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>총 구매 횟수</span>
            <strong className={styles.summaryValue}>
              {isLoading ? <Skeleton width="60px" height="28px" /> : `${totalCount}회`}
            </strong>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>총 구매 금액</span>
            <strong className={styles.summaryValue}>
              {isLoading ? (
                <Skeleton width="120px" height="28px" />
              ) : (
                `${formatPrice(totalAmount)}원`
              )}
            </strong>
          </div>
        </div>

        <div className={styles.list}>
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <PurchaseCardSkeleton key={index} />
              ))}
            </>
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
                  <div className={styles.purchaseTop}>
                    <h3 className={styles.productName}>{purchase.product}</h3>
                    <p className={styles.purchaseDate}>{formatPurchaseDate(purchase.date)}</p>
                  </div>
                  <div className={styles.purchaseBottom}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>단가</span>
                      <span className={styles.infoValue}>{formatPrice(purchase.price)}원</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.quantityLabel}>수량</span>
                      <span className={styles.quantityValue}>{purchase.quantity}개</span>
                    </div>
                    <div className={styles.totalRow}>
                      <span className={styles.totalPriceLabel}>총 금액</span>
                      <span className={styles.totalPriceValue}>
                        {formatPrice(purchase.price * purchase.quantity)}원
                      </span>
                    </div>
                  </div>
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
