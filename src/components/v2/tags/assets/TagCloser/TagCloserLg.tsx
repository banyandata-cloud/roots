import React from 'react';

interface TagCloserLgProps extends React.SVGProps<SVGSVGElement> {
	size?: number | string;
	color?: string;
}

const TagCloserLg: React.FC<TagCloserLgProps> = ({ size = 20, color = '#A4A7AE', ...props }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path d='M6.5 6.5L13.5 13.5' stroke={color} strokeWidth='1.6' strokeLinecap='round' />
			<path d='M6.5 13.5L13.5 6.5' stroke={color} strokeWidth='1.6' strokeLinecap='round' />
		</svg>
	);
};

export default TagCloserLg;
