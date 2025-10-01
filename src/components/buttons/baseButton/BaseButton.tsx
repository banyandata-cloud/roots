import { forwardRef, type MouseEvent } from 'react';
import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
// import styles from './BaseButton.module.css';
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

	const variantClasses: Record<string, string> = {
		contained: 'bn-bg-black bn-text-white',
		outlined: 'bn-border bn-border-black bn-text-black',
		text: 'bn-text-black bn-bg-transparent',
	};

	const radiusClasses: Record<string, string> = {
		default: 'bn-rounded-md',
		full: 'bn-rounded-full',
		none: 'bn-rounded-none',
	};

	const sizeClasses: Record<string, string> = {
		sm: 'bn-px-3 bn-py-2 bn-text-sm',
		md: 'bn-px-4 bn-py-2 bn-text-base',
		lg: 'bn-px-5 bn-py-3 bn-text-lg',
	};

	return (
		<BaseCell
			// className={classes(styles.root, styles[variant], className)}
			className={classes(
				'bn-inline-flex bn-flex-row bn-justify-center bn-items-center bn-select-none bn-border-0  bn-py-2 bn-px-3 focus:bn-outline-1 focus:bn-outline-[#0043ce]',
				variantClasses[variant],
				radiusClasses[radius],
				sizeClasses[size],
				className
			)}
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
				onClick: (event: MouseEvent<HTMLButtonElement>) => {
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
