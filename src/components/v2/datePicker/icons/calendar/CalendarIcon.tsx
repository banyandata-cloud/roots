import type { SVGProps } from 'react';

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => {
	const { className, width = 20, height = 20, ...rest } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			className={className}
			{...rest}
		>
			<path
				d='M6.667 1.667V5M13.333 1.667V5M2.917 8.333h14.166M4.167 3.333h11.666c.69 0 1.25.56 1.25 1.25v11.25c0 .69-.56 1.25-1.25 1.25H4.167c-.69 0-1.25-.56-1.25-1.25V4.583c0-.69.56-1.25 1.25-1.25Z'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CalendarIcon;
