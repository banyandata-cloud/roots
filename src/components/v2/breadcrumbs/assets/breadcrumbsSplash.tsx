import React from 'react';

interface BreadcrumbsSplashProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
	style?: React.CSSProperties;
}

const BreadcrumbsSplash: React.FC<BreadcrumbsSplashProps> = ({
	width = 20,
	height = 20,
	color = '#A4A7AE',
	className,
	style,
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			className={className}
			style={{
				width,
				height,
				flexShrink: 0,
				display: 'inline-block',
				...style,
			}}
			aria-hidden='true'
			role='img'>
			<line
				x1='5.96276'
				y1='16.7667'
				x2='12.5205'
				y2='2.53441'
				stroke={color}
				strokeWidth='1.67'
				strokeLinecap='round'
			/>
		</svg>
	);
};

export default BreadcrumbsSplash;
