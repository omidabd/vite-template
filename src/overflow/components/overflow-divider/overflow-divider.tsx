import * as React from 'react';
import { useOverflowDivider } from '@/overflow/use-overflow-divider';
import { applyTriggerPropsToChildren } from '@/overflow/utils/trigger/apply-trigger-props-to-children';
import { useMergedRefs } from '@/overflow/utils/use-merged-refs';
import { OverflowDividerProps } from './overflow-divider.types';

/**
 * Attaches overflow item behavior to its child registered with the OverflowContext.
 * It does not render an element of its own.
 */
export const OverflowDivider = React.forwardRef((props: OverflowDividerProps, ref) => {
  const { groupId, children } = props;

  const containerRef = useOverflowDivider(groupId);
  return applyTriggerPropsToChildren(children, {
    ref: useMergedRefs(containerRef, ref),
  });
});
