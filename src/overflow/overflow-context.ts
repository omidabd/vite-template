// import type {
//   OverflowGroupState,
//   OverflowItemEntry,
//   OverflowDividerEntry,
// } from '@fluentui/priority-overflow';
import { Context, createContext, useContextSelector } from 'use-context-selector';
import type {
  OverflowDividerEntry,
  OverflowGroupState,
  OverflowItemEntry,
} from './priority-overflow';

/**
 * @internal
 */
export interface OverflowContextValue {
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
  hasOverflow: boolean;
  registerItem: (item: OverflowItemEntry) => () => void;
  registerOverflowMenu: (el: HTMLElement) => () => void;
  registerDivider: (divider: OverflowDividerEntry) => () => void;
  updateOverflow: (padding?: number) => void;
}

export const OverflowContext = createContext<OverflowContextValue | undefined>(
  undefined
) as Context<OverflowContextValue>;

const overflowContextDefaultValue: OverflowContextValue = {
  itemVisibility: {},
  groupVisibility: {},
  hasOverflow: false,
  registerItem: () => () => null,
  updateOverflow: () => null,
  registerOverflowMenu: () => () => null,
  registerDivider: () => () => null,
};

type ContextSelector<Value, SelectedValue> = (value: Value) => SelectedValue;

/**
 * @internal
 */
export const useOverflowContext = <SelectedValue>(
  selector: ContextSelector<OverflowContextValue, SelectedValue>
) => useContextSelector(OverflowContext, (ctx = overflowContextDefaultValue) => selector(ctx));
