const Info = (props) => {
	const { className } = props;

	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M8.00004 5.00004H8.00671M8.00004 7.00004L8.00671 10.6667M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z'
				stroke='#71839B'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

Info.defaultProps = {
	className: '',
};

export default Info;
