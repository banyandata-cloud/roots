const BreadcrumbSeperator = (props) => {
	const { className } = props;
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M14.4809 3.88548L9.51916 20.1145'
				stroke='black'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

BreadcrumbSeperator.defaultProps = {
	className: '',
};

export default BreadcrumbSeperator;
