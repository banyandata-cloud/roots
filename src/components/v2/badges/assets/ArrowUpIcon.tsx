import React from 'react';

export interface ArrowUpIconProps {
	size?: number | undefined;
	color?: string | undefined;
	className?: string | undefined;
}

const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({ size = 12, color = '#717680', className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 12 12'
			fill='none'
			className={className}>
			<path
				d='M6 9.5L6 2.5M6 2.5L2.53017 5.96982M6 2.5L9.46982 5.96982'
				stroke={color}
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ArrowUpIcon;
