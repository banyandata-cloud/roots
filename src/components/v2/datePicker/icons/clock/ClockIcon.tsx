import type { SVGProps } from 'react';

const ClockIcon = (props: SVGProps<SVGSVGElement>) => {
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
				d='M10 5.417V10l2.917 1.667M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ClockIcon;
