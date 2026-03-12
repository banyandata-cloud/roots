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
	className?: string | undefined;
	size?: CheckboxSize;
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	error?: boolean;
	warning?: boolean;
	label?: ReactNode | undefined;
	subLabel?: ReactNode | undefined;
	errorMessage?: ReactNode | undefined;
	id?: string | undefined;
	name?: string | undefined;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
}
