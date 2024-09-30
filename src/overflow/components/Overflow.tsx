import * as React from 'react';
import clsx from 'clsx';
import { OverflowContext } from '../overflowContext';
import { ObserveOptions, OnUpdateOverflow, OverflowGroupState } from '../priorityOverflow';
import { updateVisibilityAttribute, useOverflowContainer } from '../useOverflowContainer';
import { useMergedRefs } from '../utils';
import { applyTriggerPropsToChildren, getTriggerChild } from '../utils/trigger';
import classes from './overflow.module.css';

interface OverflowState {
  hasOverflow: boolean;
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
}

/**
 * Overflow Props
 */
export type OverflowProps = Partial<
  Pick<ObserveOptions, 'overflowAxis' | 'overflowDirection' | 'padding' | 'gap' | 'minimumVisible'>
> & {
  children: React.ReactElement;
};

/**
 * Provides an OverflowContext for OverflowItem descendants.
 */
export const Overflow = React.forwardRef((props: OverflowProps, ref) => {
  const {
    children,
    minimumVisible,
    overflowAxis = 'horizontal',
    overflowDirection,
    padding = 0,
    gap = 0,
  } = props;

  const [overflowState, setOverflowState] = React.useState<OverflowState>({
    hasOverflow: false,
    itemVisibility: {},
    groupVisibility: {},
  });

  // useOverflowContainer wraps this method in a useEventCallback.
  const update: OnUpdateOverflow = (data) => {
    const { visibleItems, invisibleItems, groupVisibility } = data;

    const itemVisibility: Record<string, boolean> = {};
    visibleItems.forEach((item) => {
      itemVisibility[item.id] = true;
    });
    invisibleItems.forEach((x) => (itemVisibility[x.id] = false));

    setOverflowState(() => {
      return {
        hasOverflow: data.invisibleItems.length > 0,
        itemVisibility,
        groupVisibility,
      };
    });
  };

  const { containerRef, registerItem, updateOverflow, registerOverflowMenu, registerDivider } =
    useOverflowContainer(update, {
      overflowDirection,
      overflowAxis,
      padding,
      gap,
      minimumVisible,
      onUpdateItemVisibility: updateVisibilityAttribute,
    });

  const gapNum = gap;
  const paddingNum = padding || 0;
  const child = getTriggerChild(children);
  const clonedChild = applyTriggerPropsToChildren(children, {
    ref: useMergedRefs(containerRef, ref, child?.ref),
    className: clsx(
      'fui-Overflow',
      classes.overflowMenu,
      classes.overflowingItems,
      children.props.className
    ),
    style: { ...children.props.style, gap: gapNum, paddingInline: paddingNum },
  });

  return (
    <OverflowContext.Provider
      value={{
        itemVisibility: overflowState.itemVisibility,
        groupVisibility: overflowState.groupVisibility,
        hasOverflow: overflowState.hasOverflow,
        registerItem,
        updateOverflow,
        registerOverflowMenu,
        registerDivider,
      }}
    >
      {clonedChild}
    </OverflowContext.Provider>
  );
});
