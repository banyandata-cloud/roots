import React from 'react';

interface TagCloserMdProps extends React.SVGProps<SVGSVGElement> {
	size?: number | string;
	color?: string;
}

const TagCloserMd: React.FC<TagCloserMdProps> = ({ size = 16, color = '#A4A7AE', ...props }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path d='M5 5L11 11' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
			<path d='M5 11L11 5' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
		</svg>
	);
};

export default TagCloserMd;
