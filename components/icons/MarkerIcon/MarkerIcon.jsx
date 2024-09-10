const MarkerIcon = (props) => {
	const { className = '' } = props;
	return (
		<svg
			width='12'
			height='12'
			viewBox='0 0 21 24'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'>
			<ellipse
				cx='10.0941'
				cy='19.515'
				rx='10.0941'
				ry='3.62337'
				fill='#94BACB'
				fillOpacity='0.4'
			/>
			<path
				d='M15.7206 6.43321C15.7206 11.1561 10.3149 11.0529 10.3149 13.3818C10.3149 11.0854 4.90918 11.1217 4.90918 6.43321C4.90918 3.43253 7.32941 0.999999 10.3149 1C13.3004 1 15.7206 3.43253 15.7206 6.43321ZM10.3149 13.3818V17.6909V13.3818Z'
				fill='#E2496E'
			/>
			<path
				d='M10.3149 13.3818C10.3149 11.0529 15.7206 11.1561 15.7206 6.43321C15.7206 3.43253 13.3004 1 10.3149 1C7.32941 0.999999 4.90918 3.43253 4.90918 6.43321C4.90918 11.1217 10.3149 11.0854 10.3149 13.3818ZM10.3149 13.3818V17.6909'
				stroke='black'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default MarkerIcon;
