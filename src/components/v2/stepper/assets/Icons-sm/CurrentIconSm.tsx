import React from 'react';

interface CurrentIconProps {
	width?: number | string;
	height?: number | string;
	bgBrandSolid?: string;
	bgPrimary?: string;
	ringStroke?: string;
	className?: string;
	style?: React.CSSProperties;
}

const CurrentIconSm: React.FC<CurrentIconProps> = ({
	width = 24,
	height = 24,
	bgBrandSolid = 'var(--color-fg-brand-primary, #1570EF)',
	bgPrimary = 'var(--color-fg-white, #FFFFFF)', // invariant white dot, must not shift in dark mode
	ringStroke = 'var(--stepper-current-ring, transparent)',
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
			<circle cx='12' cy='12' r='11' fill={bgBrandSolid} stroke={ringStroke} strokeWidth='2' />
			<circle cx='12' cy='12' r='4' fill={bgPrimary} />
		</svg>
	);
};

export default CurrentIconSm;
