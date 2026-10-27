const Copy = ({ className }: { className?: string | undefined }) => (
	<svg
		className={className}
		width='1.25rem'
		height='1.25rem'
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		aria-hidden='true'
	>
		<path
			d='M12.4997 5.41667V4.5C12.4997 3.39543 11.6042 2.5 10.4997 2.5H5.33301C4.22844 2.5 3.33301 3.39543 3.33301 4.5V10.5C3.33301 11.6046 4.22844 12.5 5.33301 12.5H5.41634'
			stroke='currentColor'
			strokeWidth='1.67'
			strokeLinecap='round'
		/>
		<rect
			x='7.5'
			y='7.5'
			width='9.16667'
			height='10'
			rx='2'
			stroke='currentColor'
			strokeWidth='1.67'
		/>
	</svg>
);

export default Copy;
