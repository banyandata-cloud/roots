import React from 'react';

interface BreadcrumbsHomeProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
	style?: React.CSSProperties;
}

const BreadcrumbsHome: React.FC<BreadcrumbsHomeProps> = ({
	width = 20,
	height = 20,
	color = '#000000',
	className,
	style,
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			className={className}
			style={{
				width,
				height,
				aspectRatio: '1 / 1',
				flexShrink: 0,
				display: 'inline-block',
				...style,
			}}
			aria-hidden='true'
			role='img'>
			<path
				d='M2.25165 8.83083C2.25165 8.17828 2.56999 7.56677 3.10454 7.1925L8.8573 3.16462C9.54639 2.68214 10.4637 2.68242 11.1525 3.16533L16.8965 7.19242C17.4305 7.56677 17.7484 8.17793 17.7484 8.83004V15.6391C17.7484 16.7437 16.853 17.6391 15.7484 17.6391H4.25165C3.14708 17.6391 2.25165 16.7436 2.25165 15.6391V8.83083Z'
				stroke={color}
				strokeWidth='1.67'
			/>
			<path
				d='M6.12842 14.8979H13.8716'
				stroke={color}
				strokeWidth='1.67'
				strokeLinecap='round'
			/>
		</svg>
	);
};

export default BreadcrumbsHome;
