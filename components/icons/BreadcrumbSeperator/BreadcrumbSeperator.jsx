const BreadcrumbSeperator = (props) => {
	const { className } = props;
	return (
		<svg
			className={className}
			data-elem='breadcrumb-seperator-icon'
			viewBox='0 0 24 24'
			stroke='black'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M14.4809 3.88548L9.51916 20.1145'
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
