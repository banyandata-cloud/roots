import React from 'react';

interface BreadcrumbsArrowProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
	style?: React.CSSProperties;
}

const BreadcrumbsArrow: React.FC<BreadcrumbsArrowProps> = ({
	width = 16,
	height = 16,
	color = '#A4A7AE',
	className,
	style,
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 16 16'
			fill='none'
			className={className}
			style={{
				width,
				height,
				aspectRatio: '1 / 1',
				flexShrink: 0,
				display: 'inline-block',
				...style,
			}}
			aria-hidden='true'
			role='img'>
			<path
				d='M6 4L10 8L6 12'
				stroke={color}
				strokeWidth='1.33'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default BreadcrumbsArrow;
