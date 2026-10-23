import type { SVGProps } from 'react';

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => {
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
				d='M6.75 4.5 11.25 9l-4.5 4.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ChevronRightIcon;
