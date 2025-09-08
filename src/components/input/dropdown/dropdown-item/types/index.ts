import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

export type DropdownItemVariant = 'checkbox' | 'radio' | undefined;

export interface DropdownItemProps {
	title: string | ReactNode;
	value: string | number | null;
	variant?: DropdownItemVariant;
	error?: string | undefined;
	selected?: boolean;

	onKeyDown?: KeyboardEventHandler<HTMLLIElement>;
	onMouseEnter?: MouseEventHandler<HTMLLIElement>;
	onClick?: MouseEventHandler<HTMLLIElement>;

	/** Additional data-* attributes to spread on the <li> */
	dataAttrs?: Record<string, string | number | boolean | undefined>;
	className?: string;
	tabIndex?: number;
	disabled?: boolean;

	/** If provided, replaces the default label+tooltip block */
	customComponent?: ReactNode;
}
