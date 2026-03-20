import React from 'react';

interface CompletedNoIconSmProps {
	width?: number | string;
	height?: number | string;
	bgSuccessSolid?: string;
	checkColor?: string;
	className?: string;
	style?: React.CSSProperties;
}

const CompletedNoIconSm: React.FC<CompletedNoIconSmProps> = ({
	width = 24,
	height = 24,
	bgSuccessSolid = '#039855',
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
			style={{
				aspectRatio: '1 / 1',
				...style,
			}}>
			{/* Full filled circle */}
			<circle cx='12' cy='12' r='12' fill={bgSuccessSolid} />

			{/* Checkmark — centered inside the circle */}
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

export default CompletedNoIconSm;
