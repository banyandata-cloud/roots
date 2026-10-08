import React from 'react';
import type { IndicatorProps, IndicatorType, StatusStyle } from '../Indicator/types';

const statusStyles: Record<IndicatorType, StatusStyle> = {
	warning: {
		fill: 'var(--color-fg-warning-secondary, #f79009)',
		stroke: 'var(--color-utility-warning-100, #fef0c7)',
	},
	error: {
		fill: 'var(--color-fg-error-primary, #d92d20)',
		stroke: 'var(--color-utility-error-100, #fee4e2)',
	},
	success: {
		fill: 'var(--color-fg-success-primary, #039855)',
		stroke: 'var(--color-utility-success-100, #d1fadf)',
	},
};

const Indicator: React.FC<IndicatorProps> = ({ type, size = 8, ...props }) => {
	const colors = statusStyles[type];

	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 8 8'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={{ aspectRatio: '1 / 1', display: 'block' }}
			{...props}>
			<g clipPath='url(#indicator_clip)'>
				<circle
					cx='4'
					cy='4'
					r='3.25'
					fill={colors.fill}
					stroke={colors.stroke}
					strokeWidth='1.5'
				/>
			</g>
			<defs>
				<clipPath id='indicator_clip'>
					<rect width='8' height='8' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Indicator;
