interface CopyProps {
	className?: string | undefined;
	width?: number | string | undefined;
	height?: number | string | undefined;
	color?: string | undefined;
}

const Copy = (props: CopyProps) => {
	const { className, width, height, color } = props;
	return (
		<svg
			width={width ?? '20'}
			height={height ?? '20'}
			className={className}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12.4997 5.41667V4.5C12.4997 3.39543 11.6042 2.5 10.4997 2.5H5.33301C4.22844 2.5 3.33301 3.39543 3.33301 4.5V10.5C3.33301 11.6046 4.22844 12.5 5.33301 12.5H5.41634'
				stroke={color ?? '#A4A7AE'}
				stroke-width='1.67'
				stroke-linecap='round'
			/>
			<rect
				x='7.5'
				y='7.5'
				width='9.16667'
				height='10'
				rx='2'
				stroke={color ?? '#A4A7AE'}
				stroke-width='1.67'
			/>
		</svg>
	);
};

export default Copy;
