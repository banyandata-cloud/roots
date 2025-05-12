const ColumnFilter = (props) => {
	const { className, v2, active } = props;

	if (active) {
		return (
			<svg
				width='1.5rem'
				height='1.5rem'
				className={className}
				viewBox='0 0 24 25'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<g clipPath='url(#clip0_2242_8740)'>
					<path
						d='M3.271 6H19.271'
						stroke='#0F62FE'
						strokeWidth='1'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M3.271 12H7.271'
						stroke='#0F62FE'
						strokeWidth='1'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M3.271 18H7.271'
						stroke='#0F62FE'
						strokeWidth='1'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M9.84447 9H20.9873C21.1108 9.04329 21.2227 9.11427 21.3144 9.20748C21.4062 9.3007 21.4754 9.41369 21.5168 9.53779C21.5582 9.66189 21.5706 9.79382 21.5531 9.92346C21.5356 10.0531 21.4887 10.177 21.4159 10.2857L17.1302 15V21L13.7016 18.4286V15L9.4159 10.2857C9.34312 10.177 9.29619 10.0531 9.27869 9.92346C9.2612 9.79382 9.27361 9.66189 9.31498 9.53779C9.35635 9.41369 9.42557 9.3007 9.51735 9.20748C9.60913 9.11427 9.72103 9.04329 9.84447 9Z'
						stroke='#0F62FE'
						strokeWidth='1'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</g>
				<defs>
					<clipPath id='clip0_2242_8740'>
						<rect width='24' height='24' fill='white' transform='translate(0 0.5)' />
					</clipPath>
				</defs>
			</svg>
		);
	}

	return v2 ? (
		<svg
			width='1.5rem'
			height='1.5rem'
			className={className}
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_2242_8740)'>
				<path
					d='M3.271 6H19.271'
					stroke='#141920'
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M3.271 12H7.271'
					stroke='#141920'
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M3.271 18H7.271'
					stroke='#141920'
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M9.84447 9H20.9873C21.1108 9.04329 21.2227 9.11427 21.3144 9.20748C21.4062 9.3007 21.4754 9.41369 21.5168 9.53779C21.5582 9.66189 21.5706 9.79382 21.5531 9.92346C21.5356 10.0531 21.4887 10.177 21.4159 10.2857L17.1302 15V21L13.7016 18.4286V15L9.4159 10.2857C9.34312 10.177 9.29619 10.0531 9.27869 9.92346C9.2612 9.79382 9.27361 9.66189 9.31498 9.53779C9.35635 9.41369 9.42557 9.3007 9.51735 9.20748C9.60913 9.11427 9.72103 9.04329 9.84447 9Z'
					stroke='#141920'
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_2242_8740'>
					<rect width='24' height='24' fill='white' transform='translate(0 0.5)' />
				</clipPath>
			</defs>
		</svg>
	) : (
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
