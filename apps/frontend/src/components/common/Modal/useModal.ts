import { useClickOutsideRef } from '@/hooks/useClickOutsideRef';
import useKeydownEscape from '@/hooks/useKeydownEscape';
import { useScrollLock } from '@/hooks/useScrollLock';
import { compoundRefs } from '@/utils/elements';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseModalOptions {
  scrollLock?: boolean;
  closeOnBackdropClick?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const useModal = (options: UseModalOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { scrollLock = true, closeOnBackdropClick = true, onOpen, onClose } = options;
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);

  const openModal = useCallback(() => {
    onOpenRef.current?.();
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    onCloseRef.current?.();
    setIsOpen(false);
  }, []);

  const clickOutsideRef = useClickOutsideRef<HTMLDivElement>(
    closeOnBackdropClick ? closeModal : null
  );

  const modalRef = compoundRefs<HTMLDivElement>(clickOutsideRef);

  useScrollLock({ scrollLock, isOpen });
  useKeydownEscape(isOpen ? closeModal : null);

  useEffect(() => {
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
  }, [onOpen, onClose]);

  return {
    modalRef,
    openModal,
    closeModal,
    isOpen,
  };
};

export default useModal;
