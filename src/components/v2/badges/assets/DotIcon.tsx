import React from 'react';

export interface DotIconProps {
	size?: number | undefined;
	color?: string | undefined;
	className?: string | undefined;
}

const DotIcon: React.FC<DotIconProps> = ({ size = 8, color = '#717680', className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 8 8'
			fill='none'
			className={className}>
			<circle cx='4' cy='4' r='3' fill={color} />
		</svg>
	);
};

export default DotIcon;
