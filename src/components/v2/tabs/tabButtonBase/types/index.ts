import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type TabButtonBaseSize = 'xs' | 'sm' | 'md';

export type TabButtonBaseType =
	| 'button-brand'
	| 'button-gray'
	| 'button-minimal'
	| 'button-white'
	| 'line'
	| 'underline';

export interface TabButtonBaseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	size?: TabButtonBaseSize;
	type?: TabButtonBaseType;
	/** Marks the tab as the selected one */
	current?: boolean;
	/** Left icon, rendered in a 20px slot */
	icon?: ReactNode;
	/** Right icon, rendered in a 20px slot */
	rightIcon?: ReactNode;
	/** Count/label shown in the badge; omit to hide it */
	badge?: ReactNode;
}
