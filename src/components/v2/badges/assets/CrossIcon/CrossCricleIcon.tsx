import React from 'react';

export interface CrossCircleIconProps {
	size?: number | undefined;
	color?: string | undefined;
	bg?: string | undefined;
	className?: string | undefined;
}

const CrossCircleIcon: React.FC<CrossCircleIconProps> = ({
	size = 16,
	color = '#717680',
	bg = '#F5F5F5',
	className,
}) => {
	return (
		<div
			className={className}
			style={{
				display: 'flex',
				width: size,
				height: size,
				padding: 2,
				justifyContent: 'center',
				alignItems: 'center',
				aspectRatio: '1 / 1',
				borderRadius: '999999px', // full radius
				background: bg,
				cursor: 'pointer',
			}}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={size - 4}
				height={size - 4}
				viewBox='0 0 16 16'
				fill='none'>
				<path
					d='M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z'
					fill={bg}
				/>

				<path d='M5.00001 5L11 11' stroke={color} strokeWidth={1.5} strokeLinecap='round' />
				<path d='M5 11L11 5.00001' stroke={color} strokeWidth={1.5} strokeLinecap='round' />
			</svg>
		</div>
	);
};

export default CrossCircleIcon;
