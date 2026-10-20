import type { SVGProps } from 'react';

/** Range arrow (C6): joins the Start and End date fields, never interactive. */
const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => {
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
				d='M4.167 10h11.666M10.833 5l5 5-5 5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ArrowRightIcon;
