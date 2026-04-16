import type { BaseButtonProps } from '@/components/buttons/baseButton/types';
import type { ElementSizeTypes } from '@/components/cell';
import type { ComponentType } from 'react';

export type ButtonColors = 'primary' | 'success' | 'danger' | 'warning';

export interface ButtonProps extends BaseButtonProps {
	color?: ButtonColors;
	leftComponent?: ComponentType | undefined;
	rightComponent?: ComponentType | undefined;
	size?: ElementSizeTypes;
	dataTestId?: string | undefined;
	v2?: boolean;
}
