const Tick = (props: { className?: string | undefined }) => {
	const { className } = props;

	return (
		<svg
			className={className}
			viewBox='0 0 13 12'
			fill='#0F62FE'
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_638_154)'>
				<path d='M11.6911 1.6875H10.7549C10.6237 1.6875 10.4991 1.74777 10.4188 1.85089L4.89691 8.84598L2.24914 5.49107C2.20908 5.44022 2.15803 5.3991 2.09981 5.3708C2.04159 5.3425 1.97771 5.32776 1.91298 5.32768H0.976817C0.887085 5.32768 0.837531 5.4308 0.892442 5.50045L4.56075 10.1478C4.73217 10.3647 5.06164 10.3647 5.23441 10.1478L11.7755 1.85893C11.8304 1.79063 11.7808 1.6875 11.6911 1.6875Z' />
			</g>
			<defs>
				<clipPath id='clip0_638_154'>
					<rect width='12' height='12' fill='white' transform='translate(0.333344)' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Tick;
