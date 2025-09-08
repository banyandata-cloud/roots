import type { BaseCellProps } from 'components/cell';
import type { MouseEvent, ReactElement } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface BaseButtonProps extends BaseCellProps<'button', false> {
	title?: ReactElement | string | undefined;
	disabled?: boolean | undefined;
	id?: string | undefined;
	type?: ButtonType;
	onClick?: ((event: MouseEvent<HTMLElement>) => void) | undefined;
	blurOnClick?: boolean;
	variant?: ButtonVariant;
}
