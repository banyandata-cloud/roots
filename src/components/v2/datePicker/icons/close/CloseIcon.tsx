import type { SVGProps } from 'react';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
	const { className, width = 16, height = 16, ...rest } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 16 16'
			fill='none'
			className={className}
			{...rest}
		>
			<path
				d='M12 4 4 12M4 4l8 8'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CloseIcon;
