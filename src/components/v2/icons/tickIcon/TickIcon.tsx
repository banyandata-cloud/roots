const TickIcon = (props: { className?: string | undefined }) => {
	const { className = '' } = props;

	return (
		<svg width='4' height='3' viewBox='0 0 4 3' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M0.176777 1.21846L1.42678 2.46846L3.71844 0.176788'
				stroke='#24A148'
				strokeWidth='0.5'
				className={className}
			/>
		</svg>
	);
};

export default TickIcon;
