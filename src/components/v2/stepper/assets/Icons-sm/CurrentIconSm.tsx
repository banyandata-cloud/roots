import React from 'react';

interface CurrentIconProps {
	width?: number | string;
	height?: number | string;
	bgBrandSolid?: string;
	bgPrimary?: string;
	className?: string;
	style?: React.CSSProperties;
}

const CurrentIconSm: React.FC<CurrentIconProps> = ({
	width = 24,
	height = 24,
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
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			style={{ aspectRatio: '1 / 1', ...style }}>
			<circle cx='12' cy='12' r='12' fill={bgBrandSolid} />
			<circle cx='12' cy='12' r='4' fill={bgPrimary} />
		</svg>
	);
};

export default CurrentIconSm;
