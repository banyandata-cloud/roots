const UnlockPassword = (props: { className?: string | undefined }) => {
	const { className = '' } = props;

	return (
		<svg
			width='1rem'
			height='1rem'
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_2866_7174)'>
				<path
					d='M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z'
					stroke='#71839B'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z'
					stroke='#71839B'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M8 11V6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6'
					stroke='#71839B'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_2866_7174'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default UnlockPassword;
