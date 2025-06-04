import type { BaseCellProps } from 'components/cell';
import type { MouseEvent, ReactElement } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface BaseButtonProps extends BaseCellProps<'button'> {
	title: ReactElement;
	disabled?: boolean;
	id?: string;
	type?: ButtonType;
	onClick: (event: MouseEvent<HTMLElement>) => void;
	blurOnClick?: boolean;
	variant?: ButtonVariant;
}
