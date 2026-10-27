import { forwardRef, type MouseEvent } from 'react';
import { classes } from '../../utils';
import styles from './Button.module.scss';
import type { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		className = '',
		title,
		leftComponent: LeftComponent,
		rightComponent: RightComponent,
		variant = 'primary',
		size = 'sm',
		radius,
		disabled,
		onClick,
		blurOnClick = true,
		id,
		type = 'submit',
		'aria-label': ariaLabel,
	} = props;

	const isIconOnly = !title && !!LeftComponent;
	const variantClass =
		variant === 'Soft'
			? styles.soft
			: variant === 'outlined'
				? styles.outline
				: styles[variant];

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		if (blurOnClick) {
			event.currentTarget.blur();
		}

		void onClick?.(event);
	};

	return (
		<button
			ref={ref}
			type={type}
			id={id}
			aria-label={ariaLabel}
			disabled={disabled}
			onClick={handleClick}
			data-elem='base-cell'
			className={classes(
				styles.root,
				variantClass,
				styles[`size-${size}`],
				radius && styles[`radius-${radius}`],
				isIconOnly && styles['icon-only'],
				className
			)}
		>
			{!isIconOnly && LeftComponent && (
				<span data-elem='component1'>
					<LeftComponent className={styles[`icon-${size}`]} />
				</span>
			)}
			<span data-elem='component2'>
				<span data-elem='title'>
					{isIconOnly ? (
						<LeftComponent className={styles[`icon-${size}`]} />
					) : (
						title || undefined
					)}
				</span>
			</span>
			{!isIconOnly && RightComponent && (
				<span data-elem='component3'>
					<RightComponent
						className={classes(
							styles[`icon-${size}`],
							size === 'lg' && styles['icon-trailing-lg']
						)}
					/>
				</span>
			)}
		</button>
	);
});

export default Button;
