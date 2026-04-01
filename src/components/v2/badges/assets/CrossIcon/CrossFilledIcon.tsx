import React, { useState } from 'react';

export interface CrossFilledIconProps {
	size?: number | undefined;
	color?: string | undefined;
	bg?: string | undefined;
	hoverColor?: string | undefined;
	className?: string | undefined;
}

const CrossFilledIcon: React.FC<CrossFilledIconProps> = ({
	size = 16,
	color = '#717680',
	bg = '#F5F5F5',
	hoverColor = '#717680',
	className,
}) => {
	const [isHovered, setIsHovered] = useState(false);

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
				borderRadius: 4,
				background: bg,
				cursor: 'pointer',
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={size - 4}
				height={size - 4}
				viewBox='0 0 16 16'
				fill='none'>
				<path
					d='M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z'
					fill={bg}
				/>
				<path
					d='M5.00001 5L11 11'
					stroke={isHovered ? hoverColor : color}
					strokeWidth={1.5}
					strokeLinecap='round'
				/>
				<path
					d='M5 11L11 5.00001'
					stroke={isHovered ? hoverColor : color}
					strokeWidth={1.5}
					strokeLinecap='round'
				/>
			</svg>
		</div>
	);
};

export default CrossFilledIcon;
