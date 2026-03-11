import type { ElementSizeTypes } from 'components/cell';
import type { BaseButtonProps } from 'components/buttons/baseButton/types';
import type { ComponentType } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'Soft' | 'outlined' | 'ghost' | 'text';
export type ButtonTextSize = 'sm' | 'md';
export type ButtonSize = ElementSizeTypes;

export interface ButtonProps extends Omit<BaseButtonProps, 'variant' | 'size' | 'component1'> {
	variant?: ButtonVariant | undefined;
	size?: ButtonSize;
	textSize?: ButtonTextSize;
	rightComponent?: ComponentType | undefined;
}
