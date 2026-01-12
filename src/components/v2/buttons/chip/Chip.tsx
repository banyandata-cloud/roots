import { forwardRef, type RefObject } from 'react';
import { classes } from '../../../../utils';
import { BaseButton } from '../baseButton';
import styles from './Chip.module.css';
import type { ChipProps } from './types';

const Chip = forwardRef<RefObject<HTMLElement>, ChipProps>((props, ref) => {
	const {
		className = '',
		type = 'button',
		leftComponent: LeftComponent,
		title,
		rightComponent: RightComponent,
		size = 'sm',
		flexible,
		radius = 'default',
		disabled,
		onClick,
		variant = 'status',
		color = 'default',
	} = props;

	return (
		<BaseButton
			{...{
				ref,
				type,
				component1: LeftComponent && <LeftComponent />,
				title,
				component3: RightComponent && <RightComponent />,
				size: 'auto',
				flexible,
				radius,
				disabled,
				onClick,
				variant: 'contained',
			}}
			className={classes(
				styles.root,
				styles[`radius-${radius}`],
				styles[variant],
				styles[color],
				styles[size],
				className
			)}
		/>
	);
});

export default Chip;
