import type { ComponentType, JSXElementConstructor, MouseEvent, ReactElement } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'Soft' | 'outlined' | 'ghost';
export type ButtonTextSize = 'sm' | 'md';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'auto';

export interface ButtonProps {
	className?: string | undefined;
	title?: string | ReactElement<unknown, string | JSXElementConstructor<unknown>>;
	leftComponent?: ComponentType<Record<string, unknown>>;
	rightComponent?: ComponentType<Record<string, unknown>>;
	variant?: ButtonVariant;
	size?: ButtonSize;
	textSize?: ButtonTextSize;
	disabled?: boolean | undefined;
	id?: string | undefined;
	type?: 'button' | 'submit' | 'reset';
	onClick?: (event: MouseEvent<HTMLElement>) => void | Promise<void> | undefined;
	blurOnClick?: boolean | undefined;
}
