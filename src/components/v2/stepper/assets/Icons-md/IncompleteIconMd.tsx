import React from 'react';

interface IncompleteIconMdProps {
	width?: number | string;
	height?: number | string;
	bgPrimary?: string;
	borderDisabledSubtle?: string;
	fgDisabledSubtle?: string;
	className?: string;
	style?: React.CSSProperties;
}

const IncompleteIconMd: React.FC<IncompleteIconMdProps> = ({
	width = 32,
	height = 32,
	bgPrimary = '#FFFFFF',
	borderDisabledSubtle = '#E9EAEB',
	fgDisabledSubtle = '#D5D7DA',
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
			<g clipPath='url(#clip0_IncompleteIconMd)'>
				<circle
					cx='16'
					cy='16'
					r='15'
					fill={bgPrimary}
					stroke={borderDisabledSubtle}
					strokeWidth='2'
				/>
				<circle cx='16' cy='16' r='5' fill={fgDisabledSubtle} />
			</g>

			<defs>
				<clipPath id='clip0_IncompleteIconMd'>
					<rect width='32' height='32' fill={bgPrimary} />
				</clipPath>
			</defs>
		</svg>
	);
};

export default IncompleteIconMd;
