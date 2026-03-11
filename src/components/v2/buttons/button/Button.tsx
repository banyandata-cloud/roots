import { forwardRef } from 'react';
import { classes } from '../../../../utils/utils';
import { BaseButton } from '../baseButton';
import styles from './Button.module.scss';
import type { ButtonProps, ButtonSize } from './types';

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
				styles[variant],
				styles[`size-${size}`],
				isIconOnly && styles['icon-only'],
				className
			)}
		/>
	);
});

export default Button;
