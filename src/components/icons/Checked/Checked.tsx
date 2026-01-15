const Checked = (props: { className?: string | undefined }) => {
	const { className = '' } = props;

	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M4 7.5L7 10.5L12.5 5' stroke='#161616' stroke-width='1.2' />
		</svg>
	);
};

export default Checked;
