import type { BaseButtonProps } from 'components/buttons/baseButton/types';
import type { ComponentType } from 'react';

type ChipColors = 'success' | 'info' | 'warning' | 'danger' | 'default';
type ChipVariant = 'status' | 'input';

export interface ChipProps extends BaseButtonProps {
	color?: ChipColors;
	vaiant?: ChipVariant;
	leftComponent?: ComponentType;
	rightComponent?: ComponentType;
}
