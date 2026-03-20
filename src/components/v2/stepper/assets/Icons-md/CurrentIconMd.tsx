import React from 'react';

interface CurrentIconMdProps {
	width?: number | string;
	height?: number | string;
	bgBrandSolid?: string;
	bgPrimary?: string;
	className?: string;
	style?: React.CSSProperties;
}

const CurrentIconMd: React.FC<CurrentIconMdProps> = ({
	width = 32,
	height = 32,
	bgBrandSolid = '#1570EF',
	bgPrimary = '#FFFFFF',
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
			style={{ aspectRatio: '1 / 1', ...style }}>
			<circle cx='16' cy='16' r='16' fill={bgBrandSolid} />
			<circle cx='16' cy='16' r='5' fill={bgPrimary} />
		</svg>
	);
};

export default CurrentIconMd;
