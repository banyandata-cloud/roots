import type { BaseCellProps } from '@/components/cell';
import type { ComponentProps, MouseEvent, ReactElement } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface BaseButtonProps extends BaseCellProps<'button', false> {
	attrs?: ComponentProps<'button'> & { [attribute: `data-${string}`]: unknown };
	title?: ReactElement | string | undefined;
	disabled?: boolean | undefined;
	id?: string | undefined;
	type?: ButtonType;
	onClick?: ((event: MouseEvent<HTMLElement>) => void | Promise<void>) | undefined;
	blurOnClick?: boolean;
	variant?: ButtonVariant;
	dataTestId?: string | undefined;
}
