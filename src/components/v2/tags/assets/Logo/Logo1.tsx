import React from 'react';

type LogoProps = {
	className?: string | undefined;
	style?: React.CSSProperties | undefined;
};

const Logo: React.FC<LogoProps> = ({ className, style }) => {
	return (
		<svg
			className={className}
			style={style}
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<rect width='16' height='16' rx='8' fill='#DAECFD' />
			<path
				d='M8.55515 5.71094L6.72047 7.29403L5.15552 10.0902H6.56681L8.55515 5.71094ZM8.79913 6.08128L8.01624 8.27722L9.51723 10.1541L6.60494 10.6521H11.3777L8.79913 6.08128Z'
				fill='#2D6EBF'
			/>
		</svg>
	);
};

export default Logo;
