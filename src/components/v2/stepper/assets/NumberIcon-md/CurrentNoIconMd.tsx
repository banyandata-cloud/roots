import React from 'react';

interface CurrentNoIconMdProps {
	width?: number | string;
	height?: number | string;
	bgPrimary?: string;
	borderSecondary?: string;
	textColor?: string;
	step?: number | string | undefined;
	className?: string;
	style?: React.CSSProperties;
}

const CurrentNoIconMd: React.FC<CurrentNoIconMdProps> = ({
	width = 32,
	height = 32,
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
			viewBox='0 0 32 32'
			fill='none'
			className={className}
			style={{
				aspectRatio: '1 / 1',
				...style,
			}}>
			<circle
				cx='16'
				cy='16'
				r='15.3333'
				fill={bgPrimary}
				stroke={borderSecondary}
				strokeWidth='1.33333'
			/>
			{step !== undefined && (
				<text
					x='16'
					y='16'
					textAnchor='middle'
					dominantBaseline='central'
					fill={textColor}
					fontFamily='"Plus Jakarta Sans", sans-serif'
					fontSize='14'
					fontWeight='600'>
					{step}
				</text>
			)}
		</svg>
	);
};

export default CurrentNoIconMd;
