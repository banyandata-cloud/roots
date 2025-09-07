import { forwardRef, type MouseEvent } from 'react';
import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
import styles from './BaseButton.module.css';
import type { BaseButtonProps } from './types';

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
	const {
		className = '',
		component1,
		title,
		component3,
		size = 'sm',
		flexible,
		radius = 'default',
		disabled,
		id,
		type = 'submit',
		onClick,
		blurOnClick = true,
		variant = 'contained',
	} = props;

	const Title = <span data-elem='title'>{title}</span>;

	return (
		<BaseCell
			className={classes(styles.root, styles[variant], className)}
			{...{
				ref,
				component1,
				component2: Title,
				component3,
				flexible,
				radius,
				size,
			}}
			attrs={{
				disabled,
				type,
				id,
				onClick: (event: MouseEvent<HTMLButtonElement>): void => {
					if (blurOnClick) {
						event.currentTarget.blur();
					}
					onClick?.(event);
				},
			}}
			RootDOM='button'
		/>
	);
});

export default BaseButton;
