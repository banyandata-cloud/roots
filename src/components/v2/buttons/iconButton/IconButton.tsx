import { forwardRef, type ReactElement } from 'react';
import { classes } from '../../../../utils/utils';
import { BaseButton } from '../../buttons';
import styles from './IconButton.module.scss';
import type { IconButtonProps, IconButtonSize } from './types/Index';

const ICON_MAP: Record<IconButtonSize, () => ReactElement> = {
	xs: () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 18 18'
			fill='none'>
			<path
				d='M2 12.2V5C2 3.89543 2.89543 3 4 3H14C15.1046 3 16 3.89543 16 5V12.2C16 13.3046 15.1046 14.2 14 14.2H4C2.89543 14.2 2 13.3046 2 12.2Z'
				stroke='currentColor'
				strokeWidth='1.5'
			/>
			<path
				d='M16 5.25854L10 8.72265C9.3812 9.07991 8.6188 9.07991 8 8.72265L2 5.25854'
				stroke='currentColor'
				strokeWidth='1.5'
			/>
		</svg>
	),
	sm: () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 18 18'
			fill='none'>
			<path
				d='M2 12.2V5C2 3.89543 2.89543 3 4 3H14C15.1046 3 16 3.89543 16 5V12.2C16 13.3046 15.1046 14.2 14 14.2H4C2.89543 14.2 2 13.3046 2 12.2Z'
				stroke='currentColor'
				strokeWidth='1.5'
			/>
			<path
				d='M16 5.25854L10 8.72265C9.3812 9.07991 8.6188 9.07991 8 8.72265L2 5.25854'
				stroke='currentColor'
				strokeWidth='1.5'
			/>
		</svg>
	),
	md: () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 18 18'
			fill='none'>
			<path
				d='M2 12.2V5C2 3.89543 2.89543 3 4 3H14C15.1046 3 16 3.89543 16 5V12.2C16 13.3046 15.1046 14.2 14 14.2H4C2.89543 14.2 2 13.3046 2 12.2Z'
				stroke='currentColor'
				strokeWidth='1.5'
			/>
			<path
				d='M16 5.25854L10 8.72265C9.3812 9.07991 8.6188 9.07991 8 8.72265L2 5.25854'
				stroke='currentColor'
				strokeWidth='1.5'
			/>
		</svg>
	),
	lg: () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'>
			<path
				d='M3 13.2V6C3 4.89543 3.89543 4 5 4H15C16.1046 4 17 4.89543 17 6V13.2C17 14.3046 16.1046 15.2 15 15.2H5C3.89543 15.2 3 14.3046 3 13.2Z'
				stroke='currentColor'
				strokeWidth='1.5'
			/>
			<path
				d='M17 6.25854L11 9.72265C10.3812 10.0799 9.6188 10.0799 9 9.72265L3 6.25854'
				stroke='currentColor'
				strokeWidth='1.5'
			/>
		</svg>
	),
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
	const {
		className = '',
		variant = 'primary',
		size = 'sm',
		disabled,
		onClick,
		blurOnClick = true,
		id,
		type = 'button',
	} = props;

	const IconComponent = ICON_MAP[size];

	return (
		<BaseButton
			ref={ref}
			type={type}
			title={<IconComponent />}
			disabled={disabled}
			onClick={onClick}
			blurOnClick={blurOnClick}
			id={id}
			className={classes(styles.root, styles[variant], styles[`size-${size}`], className)}
		/>
	);
});

export default IconButton;
