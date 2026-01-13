import type { PropsWithChildren, Ref } from 'react';
import styles from './Modal.module.css';

interface ModalProps extends PropsWithChildren {
  modalRef: Ref<HTMLDivElement | null>;
  closeModal: () => void;
  showBackdrop?: boolean;
  isOpen: boolean;
}

const Modal = ({ modalRef, closeModal, showBackdrop = true, isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {showBackdrop && <div className={styles.backdrop} />}
      <div role="dialog" aria-modal="true" ref={modalRef} className={styles.container}>
        <button
          type="button"
          onClick={closeModal}
          aria-label="모달 닫기"
          className={styles.closeButton}
        >
          <img src="/close.svg" alt="" className={styles.closeIcon} />
        </button>
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
