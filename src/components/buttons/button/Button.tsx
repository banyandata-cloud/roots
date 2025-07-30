/* eslint-disable max-len */
import { forwardRef } from 'react';
import { classes } from '../../../utils/utils';
import { BaseButton } from '../baseButton';
import styles from './Button.module.css';
import type { ButtonProps } from './types';

const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
	const {
		className = '',
		type = 'submit',
		leftComponent: LeftComponent,
		title,
		rightComponent: RightComponent,
		size = 'sm',
		flexible,
		radius = 'default',
		disabled,
		onClick,
		blurOnClick = true,
		variant = 'contained',
		color = 'primary',
		id,
	} = props;

	return (
		<BaseButton
			{...{
				ref,
				type,
				component1: LeftComponent && <LeftComponent />,
				title,
				component3: RightComponent && <RightComponent />,
				size,
				flexible,
				radius,
				id,
				disabled,
				onClick,
				blurOnClick,
				variant,
			}}
			className={classes(
				styles.root,
				styles[`radius-${radius}`],
				styles[variant],
				styles[color],
				className
			)}
		/>
	);
});

export default Button;
