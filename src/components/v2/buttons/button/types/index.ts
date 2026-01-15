import type { BaseButtonProps } from 'components/buttons/baseButton/types';
import type { ComponentType } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'Soft' | 'outlined' | 'ghost';
export type ButtonTextSize = 'sm' | 'md';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<BaseButtonProps, 'variant' | 'size' | 'component1'> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	textSize?: ButtonTextSize;
	rightComponent?: ComponentType;
}
