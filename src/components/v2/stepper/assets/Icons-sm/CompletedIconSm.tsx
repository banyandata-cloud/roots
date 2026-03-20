import React from 'react';

interface CompletedIconProps {
	width?: number | string;
	height?: number | string;
	bgBrandSolid?: string;
	checkColor?: string;
	className?: string;
	style?: React.CSSProperties;
}

const CompletedIconSm: React.FC<CompletedIconProps> = ({
	width = 24,
	height = 24,
	bgBrandSolid = '#1570EF',
	checkColor = '#FFFFFF',
	className,
	style,
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			style={{ aspectRatio: '1 / 1', ...style }}>
			<circle cx='12' cy='12' r='12' fill={bgBrandSolid} />
			<path
				d='M7.858 12.115L10.438 15.017L16.858 8.858'
				stroke={checkColor}
				strokeWidth='1.717'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CompletedIconSm;
