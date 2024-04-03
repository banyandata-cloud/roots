const ColumnFilter = (props) => {
	const { className } = props;

	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_693_739)'>
				<path
					d='M4 6H20'
					stroke='#575F6E'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M4 12H8'
					stroke='#575F6E'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M4 18H8'
					stroke='#575F6E'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M10.5735 9H21.7163C21.8398 9.04329 21.9517 9.11427 22.0434 9.20748C22.1352 9.3007 22.2045 9.41369 22.2458 9.53779C22.2872 9.66189 22.2996 9.79382 22.2821 9.92346C22.2646 10.0531 22.2177 10.177 22.1449 10.2857L17.8592 15V21L14.4306 18.4286V15L10.1449 10.2857C10.0721 10.177 10.0252 10.0531 10.0077 9.92346C9.99021 9.79382 10.0026 9.66189 10.044 9.53779C10.0854 9.41369 10.1546 9.3007 10.2464 9.20748C10.3381 9.11427 10.45 9.04329 10.5735 9Z'
					stroke='#0F62FE'
					strokeWidth='1.71429'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_693_739'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};

ColumnFilter.defaultProps = {
	className: '',
};

export default ColumnFilter;
