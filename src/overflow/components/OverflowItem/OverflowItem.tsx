import * as React from "react";
import { useOverflowItem } from "../../useOverflowItem";
import { OverflowItemProps } from "./OverflowItem.types";
import { useMergedRefs } from "../../utils";
import {
	applyTriggerPropsToChildren,
	FluentTriggerComponent,
	getTriggerChild,
} from "../../utils/trigger";

/**
 * Attaches overflow item behavior to its child registered with the OverflowContext.
 * It does not render an element of its own.
 *
 * Behaves similarly to other `*Trigger` components in Fluent UI React.
 */
export const OverflowItem = React.forwardRef(
	(props: OverflowItemProps, ref) => {
		const { id, groupId, priority, children } = props;

		const containerRef = useOverflowItem(id, priority, groupId);
		const child = getTriggerChild(children);

		return applyTriggerPropsToChildren(children, {
			ref: useMergedRefs(containerRef, ref, child?.ref),
		});
	}
);

// type casting here is required to ensure internal type FluentTriggerComponent is not leaked
(OverflowItem as FluentTriggerComponent).isFluentTriggerComponent = true;
