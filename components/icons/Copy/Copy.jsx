const Copy = (props) => {
	const { className } = props;
	return (
		<svg
			fill='black'
			className={className}
			viewBox='0 0 16 17'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M2 9.5H1V2.5C1 1.94772 1.44772 1.5 2 1.5H9V2.5H2V9.5ZM14 5.5V14.5H5V5.5H14ZM5 4.5H14C14.5523 4.5 15 4.94772 15 5.5V14.5C15 15.0523 14.5523 15.5 14 15.5H5C4.44772 15.5 4 15.0523 4 14.5V5.5C4 4.94772 4.44772 4.5 5 4.5Z'
			/>
		</svg>
	);
};

Copy.defaultProps = {
	className: '',
};

export default Copy;
