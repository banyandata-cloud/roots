const Info = (props: { className?: string | undefined }) => {
	const { className = '' } = props;

	return (
		<svg
			width='1.5rem'
			height='1.5rem'
			viewBox='0 0 22 22'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M11.001 15.4995H10.991M11.001 12.4995L10.991 6.99951M1.00098 10.9995C1.00098 5.47666 5.47813 0.999512 11.001 0.999512C16.5238 0.999512 21.001 5.47666 21.001 10.9995C21.001 16.5224 16.5238 20.9995 11.001 20.9995C5.47813 20.9995 1.00098 16.5224 1.00098 10.9995Z'
				stroke='#BD3C45'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default Info;
