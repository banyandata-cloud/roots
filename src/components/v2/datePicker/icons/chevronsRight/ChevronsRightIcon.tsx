import type { SVGProps } from 'react';

/** Jumps the calendar view forward 12 months ("next year"). */
const ChevronsRightIcon = (props: SVGProps<SVGSVGElement>) => {
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
				d='M5.25 13.5 9.75 9l-4.5-4.5M10.5 13.5 15 9l-4.5-4.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ChevronsRightIcon;
