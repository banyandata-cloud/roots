import type { SVGProps } from 'react';

/** Jumps the calendar view back 12 months ("previous year"). */
const ChevronsLeftIcon = (props: SVGProps<SVGSVGElement>) => {
	const { className, width = 18, height = 18, ...rest } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 18 18'
			fill='none'
			className={className}
			{...rest}
		>
			<path
				d='M12.75 13.5 8.25 9l4.5-4.5M7.5 13.5 3 9l4.5-4.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ChevronsLeftIcon;
