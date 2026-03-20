import React from 'react';

interface IncompleteIconProps {
	width?: number | string;
	height?: number | string;
	fgDisabledSubtle?: string;
	borderDisabledSubtle?: string;
	bgPrimary?: string;
	className?: string;
	style?: React.CSSProperties;
}

const IncompleteIconSm: React.FC<IncompleteIconProps> = ({
	width = 24,
	height = 24,
	fgDisabledSubtle = '#D5D7DA',
	borderDisabledSubtle = '#E9EAEB',
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
			{/* Outer border ring — full 24px diameter */}
			<circle cx='12' cy='12' r='12' fill={borderDisabledSubtle} />
			{/* Inner white fill — inset by 1.5px to simulate the border */}
			<circle cx='12' cy='12' r='10.5' fill={bgPrimary} />
			{/* Center dot */}
			<circle cx='12' cy='12' r='4' fill={fgDisabledSubtle} />
		</svg>
	);
};

export default IncompleteIconSm;
