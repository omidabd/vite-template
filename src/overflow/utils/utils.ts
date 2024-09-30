import React from "react";

/**
 * Verifies if an application can use DOM.
 */
export function canUseDOM(): boolean {
	return (
		// eslint-disable-next-line deprecation/deprecation, no-restricted-globals
		typeof window !== "undefined" &&
		!!(window.document && window.document.createElement)
	);
}

/**
 * React currently throws a warning when using useLayoutEffect on the server. To get around it, we can conditionally
 * useEffect on the server (no-op) and useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also need affected components to render on
 * the server.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 */
// eslint-disable-next-line no-restricted-properties
export const useIsomorphicLayoutEffect: typeof React.useEffect = canUseDOM()
	? React.useLayoutEffect
	: React.useEffect;

/**
 * @internal
 * Checks if components was mounted the first time.
 * Since concurrent mode will be released in the future this needs to be verified
 * Currently (React 17) will always render the initial mount once
 * https://codesandbox.io/s/heuristic-brook-s4w0q?file=/src/App.jsx
 * https://codesandbox.io/s/holy-grass-8nieu?file=/src/App.jsx
 *
 * @example
 * const isFirstMount = useFirstMount();
 */
export function useFirstMount(): boolean {
	const isFirst = React.useRef(true);

	if (isFirst.current) {
		isFirst.current = false;
		return true;
	}

	return isFirst.current;
}

/**
 * @internal
 * https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 *
 * Modified `useCallback` that can be used when dependencies change too frequently. Can occur when
 * e.g. user props are dependencies which could change on every render
 * e.g. volatile values (i.e. useState/useDispatch) are dependencies which could change frequently
 *
 * This should not be used often, but can be a useful re-render optimization since the callback is a ref and
 * will not be invalidated between re-renders
 *
 * @param fn - The callback function that will be used
 */
export const useEventCallback = <Args extends unknown[], Return>(
	fn: (...args: Args) => Return
) => {
	const callbackRef = React.useRef<typeof fn>(() => {
		throw new Error("Cannot call an event handler while rendering");
	});

	useIsomorphicLayoutEffect(() => {
		callbackRef.current = fn;
	}, [fn]);

	return React.useCallback(
		(...args: Args) => {
			const callback = callbackRef.current;
			return callback(...args);
		},
		[callbackRef]
	);
};
