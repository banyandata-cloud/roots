import { forwardRef } from 'react';
import { classes } from '../../../utils/utils';
import { BaseButton } from '../baseButton';
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
	} = props;

	//  Tailwind style maps
	const colorVariants: Record<string, Record<string, string>> = {
		primary: {
			contained: `bn-bg-blue-600 bn-text-white hover:bn-opacity-85`,
			outlined: `bn-bg-transparent bn-border-2 bn-border-blue-600 bn-border-1 bn-text-blue-600 hover:bn-bg-blue-600 hover:bn-text-white hover:bn-opacity-85`,
			text: `bn-text-blue-600`,
		},
		success: {
			contained: `bn-bg-green-600 bn-text-white hover:bn-opacity-85`,
			outlined: `bn-bg-transparent bn-border bn-border-green-600 bn-text-black hover:bn-bg-green-600 hover:bn-text-white hover:bn-opacity-85`,
			text: `bn-text-green-600`,
		},
		danger: {
			contained: `bn-bg-red-600 bn-text-white hover:bn-opacity-85`,
			outlined: `bn-bg-transparent bn-border bn-border-red-600 bn-text-red-600 hover:bn-bg-red-600 hover:bn-text-white hover:bn-opacity-85`,
			text: `bn-text-red-600`,
		},
		warning: {
			contained: `bn-bg-yellow-400 bn-text-black hover:bn-opacity-85`,
			outlined: `bn-bg-transparent bn-border bn-border-yellow-400 bn-text-yellow-400 hover:bn-bg-yellow-400 hover:bn-text-black hover:bn-opacity-85`,
			text: `bn-text-yellow-400`,
		},
	};

	const disabledClasses = `disabled:bn-bg-gray-300 disabled:bn-text-gray-700 disabled:bn-border-gray-400 disabled:bn-text-gray-400 disabled:bn-cursor-not-allowed`;

	//  radius map
	const radiusMap: Record<string, string> = {
		default: `bn-rounded-md`,
		round: `bn-rounded-full`,
		none: `bn-rounded-none`,
	};

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
				`bn-cursor-pointer [&_[data-elem='component2']_[data-elem='title']]:bn-font-medium [&_[data-elem='component2']_[data-elem='title']]:bn-text-sm`,
				radiusMap[radius],
				colorVariants[color]?.[variant],
				disabledClasses,
				className
			)}
		/>
	);
});

export default Button;
