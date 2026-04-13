const ChevronDownIcon = (props: { className?: string | undefined }) => {
	const { className = '' } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='16'
			height='16'
			viewBox='0 0 16 16'
			className={className}
			fill='currentColor'>
			<path
				d='M12 6L8 10L4 6'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='none'
			/>
		</svg>
	);
};

export default ChevronDownIcon;
