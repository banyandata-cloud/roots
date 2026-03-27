import React from 'react';
export interface TextFieldProps {
	// Content props
	label?: string;
	placeholder?: string;
	helperText?: string;
	value?: string;
	defaultValue?: string;

	// State props
	state?:
		| 'default'
		| 'filled'
		| 'active-typing'
		| 'filled-focus'
		| 'error-focus'
		| 'error-filled'
		| 'warning'
		| 'disable';
	size?: 'sm' | 'md';
	type?: 'default' | 'leading-text' | 'trailing-button';

	// Control props
	required?: boolean;
	disabled?: boolean;

	// Icon props
	leadingIcon?: boolean;
	leadingIconComponent?: React.ComponentType<{ className?: string }>;
	leadingText?: string;
	trailingButton?: boolean;
	trailingButtonText?: string;
	trailingButtonIcon?: boolean;
	trailingButtonIconComponent?: React.ComponentType<Record<string, unknown>>;
	helpIcon?: boolean;

	// Event handlers
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	trailingButtonOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

	// Standard HTML input props
	className?: string;
	id?: string;
	name?: string;
	autoComplete?: string;
	autoFocus?: boolean;
	readOnly?: boolean;
}
