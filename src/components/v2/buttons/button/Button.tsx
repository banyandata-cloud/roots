import { forwardRef } from 'react';
import { classes } from '../../../../utils/utils';
import { BaseButton } from '../baseButton';
import styles from './Button.module.css';
import type { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		className = '',
		title,
		leftComponent: LeftComponent,
		rightComponent: RightComponent,
		variant = 'primary',
		size = 'sm',
		disabled,
		onClick,
		blurOnClick = true,
		id,
		type = 'submit',
	} = props;

	const isIconOnly = !title && !!LeftComponent;
	const variantClass =
		variant === 'Soft'
			? styles.soft
			: variant === 'outlined'
				? styles.outline
				: styles[variant];

	return (
		<BaseButton
			ref={ref}
			type={type}
			title={
				isIconOnly ? (
					<LeftComponent className={styles[`icon-${size}`]} />
				) : (
					title || undefined
				)
			}
			component1={
				!isIconOnly && LeftComponent ? (
					<LeftComponent className={styles[`icon-${size}`]} />
				) : undefined
			}
			component3={
				!isIconOnly && RightComponent ? (
					<RightComponent className={styles[`icon-${size}`]} />
				) : undefined
			}
			disabled={disabled}
			onClick={onClick}
			blurOnClick={blurOnClick}
			id={id}
			className={classes(
				styles.root,
				variantClass,
				styles[`size-${size}`],
				isIconOnly && styles['icon-only'],
				className
			)}
		/>
	);
});

export default Button;
