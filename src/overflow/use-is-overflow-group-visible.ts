import { useOverflowContext } from './overflow-context';
import { OverflowGroupState } from './priority-overflow';

/**
 * @param id - unique identifier for a group of overflow items
 * @returns visibility state of the group
 */
export function useIsOverflowGroupVisible(id: string): OverflowGroupState {
  return useOverflowContext((ctx) => ctx.groupVisibility[id]);
}
