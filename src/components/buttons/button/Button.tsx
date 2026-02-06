import { forwardRef } from 'react';
import { classes } from '../../../utils/utils';
import { Button as Buttonv2 } from '../../v2/buttons';
import { BaseButton } from '../baseButton';
import styles from './Button.module.css';
import type { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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
		textSize = 'sm',
		v2 = false,
		dataTestId,
	} = props;

	if (v2) {
		return (
			<Buttonv2
				ref={ref}
				className={className}
				title={title}
				rightComponent={RightComponent}
				variant={variant}
				size={size}
				textSize={textSize}
				disabled={disabled}
				onClick={onClick}
				blurOnClick={blurOnClick}
				id={id}
				type={type}
			/>
		);
	}

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
				dataTestId,
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
