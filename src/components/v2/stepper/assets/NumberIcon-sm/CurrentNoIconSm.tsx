import React from 'react';

interface CurrentNumberIconSmProps {
	width?: number | string;
	height?: number | string;
	bgPrimary?: string;
	borderSecondary?: string;
	textColor?: string;
	step?: number | string | undefined;
	className?: string;
	style?: React.CSSProperties;
}

const CurrentNoIconSm: React.FC<CurrentNumberIconSmProps> = ({
	width = 24,
	height = 24,
	bgPrimary = '#FFFFFF',
	borderSecondary = '#E9EAEB',
	textColor = '#414651',
	step,
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
			<circle
				cx='12'
				cy='12'
				r='11.5'
				fill={bgPrimary}
				stroke={borderSecondary}
				strokeWidth='1'
			/>
			{step !== undefined && (
				<text
					x='12'
					y='12'
					textAnchor='middle'
					dominantBaseline='central'
					fill={textColor}
					fontFamily='"Plus Jakarta Sans", sans-serif'
					fontSize='12'
					fontWeight='600'>
					{step}
				</text>
			)}
		</svg>
	);
};

export default CurrentNoIconSm;
