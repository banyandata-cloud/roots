import React from 'react';

interface CompletedIconMdProps {
	width?: number | string;
	height?: number | string;
	bgBrandSolid?: string;
	checkColor?: string;
	className?: string;
	style?: React.CSSProperties;
}

const CompletedIconMd: React.FC<CompletedIconMdProps> = ({
	width = 32,
	height = 32,
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
			viewBox='0 0 32 32'
			fill='none'
			className={className}
			style={{
				aspectRatio: '1 / 1',
				...style,
			}}>
			<circle cx='16' cy='16' r='16' fill={bgBrandSolid} />

			<path
				d='M10.6667 15.5701L14.1058 19.4391L21.3333 12.5609'
				stroke={checkColor}
				strokeWidth='2.28936'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CompletedIconMd;
