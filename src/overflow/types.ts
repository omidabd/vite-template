import * as React from 'react';
import { OverflowContextValue } from './overflow-context';

/**
 * @internal
 */
export interface UseOverflowContainerReturn<TElement extends HTMLElement>
  extends Pick<
    OverflowContextValue,
    'registerItem' | 'updateOverflow' | 'registerOverflowMenu' | 'registerDivider'
  > {
  /**
   * Ref to apply to the container that will overflow
   */
  containerRef: React.RefObject<TElement>;
}
