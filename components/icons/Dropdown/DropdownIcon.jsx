const DropdownIcon = (props) => {
	const { className } = props;

	return (
		<svg
			className={className}
			viewBox='0 0 25 24'
			fill='#1A2028'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M7.00488 10L12.0049 15L17.0049 10H7.00488Z' />
		</svg>
	);
};

DropdownIcon.defaultProps = {
	className: '',
};

export default DropdownIcon;
