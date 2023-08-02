const Trash = (props) => {
	const { className } = props;

	return (
		<svg
			className={className}
			width='3rem'
			height='3rem'
			viewBox='0 0 14 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_3863_19293)'>
				<path
					d='M1.75 3.50499H2.91667M2.91667 3.50499H12.25M2.91667 3.50499V11.6717C2.91667 11.9811 3.03958 12.2778 3.25838 12.4966C3.47717 12.7154 3.77391 12.8383 4.08333 12.8383H9.91667C10.2261 12.8383 10.5228 12.7154 10.7416 12.4966C10.9604 12.2778 11.0833 11.9811 11.0833 11.6717V3.50499H2.91667ZM4.66667 3.50499V2.33833C4.66667 2.02891 4.78958 1.73216 5.00838 1.51337C5.22717 1.29458 5.52391 1.17166 5.83333 1.17166H8.16667C8.47609 1.17166 8.77283 1.29458 8.99162 1.51337C9.21042 1.73216 9.33333 2.02891 9.33333 2.33833V3.50499M5.83333 6.42166V9.92166M8.16667 6.42166V9.92166'
					stroke='#FF626A'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_3863_19293'>
					<rect width='14' height='14' fill='white' transform='translate(0 0.00500488)' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Trash;
