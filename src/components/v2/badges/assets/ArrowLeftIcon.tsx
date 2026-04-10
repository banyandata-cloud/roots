import React from 'react';

export interface ArrowLeftIconProps {
	size?: number | undefined;
	color?: string | undefined;
	className?: string | undefined;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({
	size = 12,
	color = '#717680',
	className,
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 12 12'
			fill='none'
			className={className}>
			<path
				d='M9.5 6H2.5M2.5 6L5.96982 2.53018M2.5 6L5.96982 9.46983'
				stroke={color}
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ArrowLeftIcon;
