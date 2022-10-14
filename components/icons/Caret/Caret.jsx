const Caret = (props) => {
	const { className } = props;

	return (
		<svg
			className={className}
			viewBox='0 0 16 17'
			fill='#161616'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M8 11.5L3 6.50005L3.7 5.80005L8 10.1L12.3 5.80005L13 6.50005L8 11.5Z' />
		</svg>
	);
};

Caret.defaultProps = {
	className: '',
};

export default Caret;
