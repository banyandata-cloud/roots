const SearchButton = (props) => {
	const { className = '' } = props;
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			className={className}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_11246_20822)'>
				<path
					d='M8.33333 13.7502C11.555 13.7502 14.1667 11.1385 14.1667 7.91683C14.1667 4.69517 11.555 2.0835 8.33333 2.0835C5.11167 2.0835 2.5 4.69517 2.5 7.91683C2.5 11.1385 5.11167 13.7502 8.33333 13.7502Z'
					stroke='#141920'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M17.5 17.0835L12.5 12.0835'
					stroke='#141920'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_11246_20822'>
					<rect width='20' height='20' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default SearchButton;
