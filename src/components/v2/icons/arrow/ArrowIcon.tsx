const ArrowIcon = (props: { className?: string | undefined }) => {
	const { className = '' } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='16'
			height='16'
			viewBox='0 0 16 16'
			className={className}
			fill='none'>
			<path
				d='M13.4243 8.42427C13.6586 8.18995 13.6586 7.81005 13.4243 7.57574L9.60589 3.75736C9.37157 3.52305 8.99167 3.52305 8.75736 3.75736C8.52304 3.99167 8.52304 4.37157 8.75736 4.60589L12.1515 8L8.75736 11.3941C8.52304 11.6284 8.52304 12.0083 8.75736 12.2426C8.99167 12.477 9.37157 12.477 9.60589 12.2426L13.4243 8.42427ZM2 8L2 8.6L13 8.6L13 8L13 7.4L2 7.4L2 8Z'
				fill='#1F5FCC'
			/>
		</svg>
	);
};

export default ArrowIcon;
