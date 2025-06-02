/**
 * Type definitions for Tooltip component and related types.
 * Provides typings for tooltip position, variant, and props.
 */
import type { ReactElement, ReactNode, Ref } from 'react';

/**
 * A ReactElement that optionally includes a ref of type T.
 * Useful for components that need to forward refs.
 *
 * @template T - The type of the ref instance.
 */
export type ReactElementWithRef<T = unknown> = ReactElement & {
	ref?: Ref<T> | null;
};

/**
 * Possible positions for the Tooltip relative to its target element.
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Visual style variants for the Tooltip.
 * @internal
 */
type TooltipVariant = 'light' | 'dark';

/**
 * Props for the Tooltip component.
 */
export interface TooltipProps {
	/**
	 * The target element that the tooltip is attached to.
	 */
	children: ReactElement;
	/**
	 * Position of the tooltip relative to the target element. Can be "top", "bottom", "left", or "right".
	 */
	position?: TooltipPosition;
	/**
	 * Content to display inside the tooltip.
	 */
	content: ReactNode;
	/**
	 * Visual style variant of the tooltip. Can be "light" or "dark".
	 */
	variant?: TooltipVariant;
	/**
	 * Additional CSS class names to apply to the tooltip.
	 */
	className?: string;
	/**
	 * Whether to show a pointer (arrow) on the tooltip.
	 */
	showPointer?: boolean;
}
