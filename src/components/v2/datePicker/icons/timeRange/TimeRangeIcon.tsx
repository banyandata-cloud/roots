import type { SVGProps } from 'react';

/** Two opposing half-arrows representing a "from -> to" time span. */
const TimeRangeIcon = (props: SVGProps<SVGSVGElement>) => {
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
				d='M2.5 6.667h11.667L11.25 3.75M17.5 13.333H5.833L8.75 16.25'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default TimeRangeIcon;
