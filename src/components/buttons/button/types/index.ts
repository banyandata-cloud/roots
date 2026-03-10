import type { BaseButtonProps } from 'components/buttons/baseButton/types';
import type { ComponentType } from 'react';
 
export type ButtonColors = 'primary' | 'success' | 'danger' | 'warning';
export type ButtonTextSize = 'sm' | 'md';
export type ButtonVariant = 'primary' | 'secondary' | 'Soft' | 'outlined' | 'ghost';
 
export interface ButtonProps extends BaseButtonProps {
    color?: ButtonColors;
    leftComponent?: ComponentType | undefined;
    rightComponent?: ComponentType | undefined;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    textSize?: ButtonTextSize;
    dataTestId?: string | undefined;
    v2?: boolean;
	  v2ButtonVariant?: ButtonVariant
}
