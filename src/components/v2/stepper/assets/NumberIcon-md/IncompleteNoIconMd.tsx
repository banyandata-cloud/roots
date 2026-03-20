import React from 'react';

interface IncompleteNoIconMdProps {
	width?: number | string;
	height?: number | string;
	bgPrimary?: string;
	borderSecondary?: string;
	textDisabled?: string;
	step?: number | string | undefined;
	className?: string;
	style?: React.CSSProperties;
}

const IncompleteNoIconMd: React.FC<IncompleteNoIconMdProps> = ({
	width = 32,
	height = 32,
	bgPrimary = '#FFFFFF',
	borderSecondary = '#E9EAEB',
	textDisabled = '#A4A7AE',
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
			{/* Circle — white fill + 1.333px border */}
			<circle
				cx='16'
				cy='16'
				r='15.3333'
				fill={bgPrimary}
				stroke={borderSecondary}
				strokeWidth='1.33333'
			/>

			{/* Step number — centered inside the SVG */}
			{step !== undefined && (
				<text
					x='16'
					y='16'
					textAnchor='middle'
					dominantBaseline='central'
					fill={textDisabled}
					fontFamily='"Plus Jakarta Sans", sans-serif'
					fontSize='14'
					fontWeight='600'>
					{step}
				</text>
			)}
		</svg>
	);
};

export default IncompleteNoIconMd;
