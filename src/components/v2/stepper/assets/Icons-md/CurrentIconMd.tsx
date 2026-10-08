import React from 'react';

interface CurrentIconMdProps {
	width?: number | string;
	height?: number | string;
	bgBrandSolid?: string;
	bgPrimary?: string;
	ringStroke?: string;
	className?: string;
	style?: React.CSSProperties;
}

const CurrentIconMd: React.FC<CurrentIconMdProps> = ({
	width = 32,
	height = 32,
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
			viewBox='0 0 32 32'
			fill='none'
			className={className}
			style={{ aspectRatio: '1 / 1', ...style }}>
			<circle cx='16' cy='16' r='14.5' fill={bgBrandSolid} stroke={ringStroke} strokeWidth='3' />
			<circle cx='16' cy='16' r='5' fill={bgPrimary} />
		</svg>
	);
};

export default CurrentIconMd;
