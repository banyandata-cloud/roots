import React from 'react';

export interface PlusIconProps {
	size?: number | undefined;
	color?: string | undefined;
	className?: string | undefined;
}

const PlusIcon: React.FC<PlusIconProps> = ({ size = 12, color = '#717680', className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 12 12'
			fill='none'
			className={className}>
			<path
				d='M6 2.5V9.5'
				stroke={color}
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M2.5 6L9.5 6'
				stroke={color}
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default PlusIcon;
