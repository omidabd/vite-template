import * as React from 'react';
import { useOverflowContext } from './overflow-context';
import { useOverflowCount } from './use-overflow-count';
import { useId, useIsomorphicLayoutEffect } from './utils';

export function useOverflowMenu<TElement extends HTMLElement>(id?: string) {
  const elementId = useId('overflow-menu', id);
  const overflowCount = useOverflowCount();
  const registerOverflowMenu = useOverflowContext((v) => v.registerOverflowMenu);
  const updateOverflow = useOverflowContext((v) => v.updateOverflow);
  const ref = React.useRef<TElement>(null);
  const isOverflowing = overflowCount > 0;

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      return registerOverflowMenu(ref.current);
    }
  }, [registerOverflowMenu, isOverflowing, elementId]);

  useIsomorphicLayoutEffect(() => {
    if (isOverflowing) {
      updateOverflow();
    }
  }, [isOverflowing, updateOverflow, ref]);

  return { ref, overflowCount, isOverflowing };
}
