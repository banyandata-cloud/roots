interface PaginationArrowIconProps {
	direction: 'left' | 'right';
	/** 'sm' is the 20px arrow of the 36px button, 'md' the 24px arrow of the 44px button. */
	size?: 'sm' | 'md';
	className?: string | undefined;
}

// Figma Pagination "Arrow": a chevron drawn in currentColor. The left arrow is the right one
// rotated 180deg about the icon centre, as in the design.
const PaginationArrowIcon = ({ direction, size = 'sm', className }: PaginationArrowIconProps) => {
	const large = size === 'md';
	const box = large ? 24 : 20;

	return (
		<svg
			className={className}
			width={box}
			height={box}
			viewBox={`0 0 ${box} ${box}`}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path
				d={
					large
						? 'M9.61863 7.5L14.3814 11.9736L9.61863 16.5'
						: 'M7.88893 6.01078L12.1111 9.97655L7.88893 13.9892'
				}
				transform={direction === 'left' ? `rotate(180 ${box / 2} ${box / 2})` : undefined}
				stroke='currentColor'
				strokeWidth={large ? 2 : 1.67}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default PaginationArrowIcon;
