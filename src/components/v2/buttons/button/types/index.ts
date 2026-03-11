import type { MouseEvent, ReactElement, JSXElementConstructor, ComponentType } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'critical';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonTextSize = 'sm' | 'md';

export interface ButtonProps {
	className?: string;
	title?: string | ReactElement<unknown, string | JSXElementConstructor<unknown>>;
	leftComponent?: ComponentType<Record<string, unknown>>;
	rightComponent?: ComponentType<Record<string, unknown>>;
	variant?: ButtonVariant;
	size?: ButtonSize;
	textSize?: ButtonTextSize;
	disabled?: boolean;
	id?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: (event: MouseEvent<HTMLElement>) => void | Promise<void>;
	blurOnClick?: boolean;
}
