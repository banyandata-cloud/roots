const MagnifyingGlass = (props) => {
	const { className } = props;
	return (
		<svg
			className={className}
			viewBox='0 0 19 18'
			fill='none'
			width='3rem'
			height='3rem'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M8.85626 14.0625C12.1182 14.0625 14.7625 11.4182 14.7625 8.15625C14.7625 4.89432 12.1182 2.25 8.85626 2.25C5.59433 2.25 2.95001 4.89432 2.95001 8.15625C2.95001 11.4182 5.59433 14.0625 8.85626 14.0625Z'
				stroke='#888888'
				strokeWidth='1.29375'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M13.0328 12.3328L16.45 15.75'
				stroke='#888888'
				strokeWidth='1.29375'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

MagnifyingGlass.defaultProps = {
	className: '',
};

export default MagnifyingGlass;
