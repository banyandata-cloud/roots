import { forwardRef } from 'react';
import { classes } from '../../../../utils/utils';
import { BaseButton } from '../baseButton';
import styles from './Button.module.css';
import type { ButtonProps } from './types';
import { ButtonCaret } from '../../../icons';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		className = '',
		title,
		rightComponent: RightComponent,
		variant = 'primary',
		size = 'sm',
		textSize = 'sm',
		disabled,
		onClick,
		blurOnClick = true,
		id,
		type = 'submit',
	} = props;

	const TEXT_SIZE_MAP = {
		sm: '14',
		md: '16',
	} as const;

	const RightIcon = RightComponent ?? ButtonCaret;
	const resolvedTextSize = TEXT_SIZE_MAP[textSize];

	return (
		<BaseButton
			ref={ref}
			type={type}
			title={title}
			component3={<RightIcon />}
			disabled={disabled}
			onClick={onClick}
			blurOnClick={blurOnClick}
			id={id}
			className={classes(
				styles.root,
				styles[variant],
				styles[`size-${size}`],
				styles[`text-${resolvedTextSize}`],
				className
			)}
		/>
	);
});

export default Button;
