import React from 'react';

export interface DropdownRef {
	focus: () => void;
}

export interface DropdownOption {
	value: string;
	label: string;
	icon?: React.ComponentType<any> | undefined;
}

export interface DataLabel {
	singular: string;
	plural: string;
}

export interface DropdownProps {
	// Content props
	label?: string | undefined;
	placeholder?: string | undefined;
	helperText?: string | undefined;
	value?: string | undefined;
	defaultValue?: string | undefined;
	selectedValues?: string[] | undefined; // For multi-select
	defaultSelectedValues?: string[] | undefined; // For multi-select
	options?: DropdownOption[] | undefined;
	dataLabel?: string | DataLabel | undefined; // For multi-select display text (e.g., "Selected Item/Items")
	customAllLabel?: string | undefined; // For multi-select "All" option label

	// State props
	state?:
		| 'default'
		| 'selected'
		| 'focus'
		| 'disabled'
		| 'error'
		| 'warning'
		| 'read-only'
		| undefined;
	size?: 'sm' | 'md' | undefined;
	variant?: 'simple' | 'multi-select' | 'with-icon' | undefined;

	// Control props
	required?: boolean | undefined;
	disabled?: boolean | undefined;
	readOnly?: boolean | undefined;

	// Icon props
	helpIcon?: boolean | undefined;
	errorIcon?: boolean | undefined;
	warningIcon?: boolean | undefined;
	icon?: React.ComponentType<any> | undefined;

	// Event handlers
	onChange?: ((value: string) => void) | undefined;
	onMultiSelectChange?: ((values: string[]) => void) | undefined; // For multi-select

	onFocus?: ((e: React.FocusEvent<HTMLElement>) => void) | undefined;
	onBlur?: ((e: React.FocusEvent<HTMLElement>) => void) | undefined;

	// Standard HTML props
	className?: string | undefined;
	id?: string | undefined;
	name?: string | undefined;
}
