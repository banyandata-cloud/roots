const SearchIcon = ({ className, ...rest }) => {
	return (
		<svg
			width='25'
			height='25'
			className={className}
			viewBox='0 0 25 25'
			fill='none'
			{...rest}
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_3076_207)'>
				<path
					d='M10.5 17C14.366 17 17.5 13.866 17.5 10C17.5 6.13401 14.366 3 10.5 3C6.63401 3 3.5 6.13401 3.5 10C3.5 13.866 6.63401 17 10.5 17Z'
					stroke='#141920'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M21.5 21L15.5 15'
					stroke='#141920'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_3076_207'>
					<rect width='24' height='24' fill='white' transform='translate(0.5 0.5)' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default SearchIcon;
