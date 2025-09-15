const Edit = (props: { className?: string | undefined }) => {
	const { className } = props;

	return (
		<svg
			className={className}
			viewBox='0 0 16 17'
			fill='none'
			stroke='#101010'
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_7396_6511)'>
				<path
					d='M3.33341 11.4333L2.66675 14.0999L5.33341 13.4333L13.0001 5.7666C13.5524 5.21432 13.5524 4.31889 13.0001 3.7666C12.4478 3.21432 11.5524 3.21432 11.0001 3.7666L3.33341 11.4333Z'
					strokeWidth='1.33333'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M10 4.7666L12 6.7666'
					strokeWidth='1.33333'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M8.66675 14.0999H14.0001'
					strokeWidth='1.33333'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_7396_6511'>
					<rect width='16' height='16' fill='white' transform='translate(0 0.766602)' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Edit;
