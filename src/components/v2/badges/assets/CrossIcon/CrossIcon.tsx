import React from 'react';
interface CrossIconProps extends React.SVGProps<SVGSVGElement> {
	size?: number | undefined;
	color?: string | undefined;
	className?: string | undefined;
}

const CrossIcon: React.FC<CrossIconProps> = ({ size = 12, color = '#A4A7AE', ...props }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path
				d='M9 3L3 9M3 3L9 9'
				stroke={color}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CrossIcon;
