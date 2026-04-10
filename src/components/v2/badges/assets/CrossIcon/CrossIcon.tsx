import React from 'react';

interface CrossIconProps extends React.SVGProps<SVGSVGElement> {
	size?: number | undefined;
	color?: string | undefined;
	className?: string | undefined;
}

const CrossIcon: React.FC<CrossIconProps> = ({ size = 16, color = '#A4A7AE', ...props }) => {
	return (
		<svg
			{...props}
			width={size}
			height={size}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M5 5L11 11' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
			<path d='M5 11L11 5.00001' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
		</svg>
	);
};

export default CrossIcon;
