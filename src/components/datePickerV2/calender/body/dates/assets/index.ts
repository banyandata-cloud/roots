import React from 'react';

interface TodayIndicatorProps {
	className?: string;
}

export const TodayIndicator = ({ className }: TodayIndicatorProps): React.ReactElement => {
	return React.createElement(
		'svg',
		{
			width: '0.3125rem',
			height: '0.3125rem',
			className,
			viewBox: '0 0 5 5',
			fill: '#0F62FE',
			xmlns: 'http://www.w3.org/2000/svg',
		},
		React.createElement('circle', {
			cx: '2.5',
			cy: '2.49707',
			r: '2',
		})
	);
};
