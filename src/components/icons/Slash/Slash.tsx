const Slash = (props: {
	className?: string | undefined;
	width?: number | undefined;
	height?: number | undefined;
	color?: string | undefined;
}) => {
	const { className, width, height, color } = props;
	return (
		<svg
			className={className}
			width={width ?? '1.25rem'}
			height={height ?? '1.25rem'}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M7 3L13 17'
				stroke={color ?? '#717680'}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default Slash;
