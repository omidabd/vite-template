import * as React from "react";
import { useOverflowDivider } from "../../useOverflowDivider";
import { OverflowDividerProps } from "./OverflowDivider.types";
import { applyTriggerPropsToChildren } from "../../utils/trigger";
import { useMergedRefs } from "../../utils";

/**
 * Attaches overflow item behavior to its child registered with the OverflowContext.
 * It does not render an element of its own.
 */
export const OverflowDivider = React.forwardRef(
	(props: OverflowDividerProps, ref) => {
		const { groupId, children } = props;

		const containerRef = useOverflowDivider(groupId);
		return applyTriggerPropsToChildren(children, {
			ref: useMergedRefs(containerRef, ref),
		});
	}
);
