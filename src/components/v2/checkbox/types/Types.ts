import type { ChangeEvent, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg' | 'xlg';
export type CheckboxState =
	| 'default'
	| 'hover'
	| 'focus'
	| 'disabled'
	| 'readOnly'
	| 'error'
	| 'warning';
export type CheckboxValue = 'checked' | 'unchecked' | 'indeterminate';

export interface CheckboxProps {
	className?: string;
	size?: CheckboxSize;
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	error?: boolean;
	warning?: boolean;
	label?: ReactNode;
	subLabel?: ReactNode;
	errorMessage?: ReactNode;
	id?: string;
	name?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
