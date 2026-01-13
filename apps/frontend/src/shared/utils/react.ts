import { Ref } from 'react';

export const compoundRefs = <T>(...refs: Ref<T>[]) => {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(node);
        return;
      }

      ref.current = node;
    });
  };
};
