import type { ComponentType, ReactNode } from 'react';

export interface AccordionProps {
	/**
	 * Controls the open / close state when the component is used in a controlled manner
	 */
	open?: boolean;
	/**
	 * Handler that is triggered when the header is clicked while the component is controlled.
	 * Receives the current `open` state as an argument so that the parent can update it accordingly.
	 */
	onToggle?: (open: boolean | undefined) => void;
	/**
	 * Sets the default open state when the component is used in an uncontrolled manner.
	 */
	defaultOpen?: boolean;
	/**
	 * Optional component rendered on the very left side of the header.
	 * Usually an Icon. Receives the `className` needed for styling.
	 */
	leftComponent?: ComponentType<{ className?: string }>;
	/**
	 * Optional component rendered on the very right side of the header.
	 * Usually an Icon. Receives the `className` needed for styling.
	 */
	rightComponent?: ComponentType<{ className?: string }> | null;
	/**
	 * Title shown inside the header.
	 */
	title?: ReactNode;
	/**
	 * Optional description shown at the top of the body.
	 */
	description?: string;
	/**
	 * Children rendered inside the body when the accordion is open.
	 */
	children?: ReactNode;
	/**
	 * Callback executed when the uncontrolled component toggles its state.
	 * Receives the new open state.
	 */
	onClick?: (open: boolean) => void;
	/**
	 * Additional className appended to the root element.
	 */
	className?: string;
	/**
	 * If provided, a *See More* button will be shown that triggers this callback when clicked.
	 */
	onExpand?: () => void;
	disabled?: boolean;
}
