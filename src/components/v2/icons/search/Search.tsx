const Search = ({ className = '', color = '#A4A7AE' }) => {
	return (
		<svg
			className={className}
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<circle cx='9.45759' cy='9.62556' r='6.95759' stroke={color} stroke-width='1.67' />
			<path
				d='M14.5049 14.3367L17.5001 17.3319'
				stroke={color}
				stroke-width='1.6'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default Search;
