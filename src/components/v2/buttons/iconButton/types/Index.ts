import type { MouseEvent } from 'react';

export type IconButtonVariant = 'primary' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'critical';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconButtonProps {
	className?: string;
	variant?: IconButtonVariant;
	size?: IconButtonSize;
	disabled?: boolean;
	id?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: (event: MouseEvent<HTMLElement>) => void | Promise<void>;
	blurOnClick?: boolean;
}
