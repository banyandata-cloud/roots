const Columns = (props) => {
	const { className } = props;
	return (
		<svg
			className={className}
			viewBox='0 0 26 26'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M11.5935 21.0107L11.5935 4.98934C11.5935 4.54693 11.2393 4.18828 10.8024 4.18828H6.84694C6.41003 4.18828 6.05584 4.54693 6.05584 4.98934L6.05584 21.0107C6.05584 21.4531 6.41003 21.8117 6.84694 21.8117H10.8024C11.2393 21.8117 11.5935 21.4531 11.5935 21.0107Z'
				stroke='#333333'
				strokeWidth='1.91877'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M20.2955 21.0107V4.98934C20.2955 4.54693 19.9413 4.18828 19.5044 4.18828H15.549C15.1121 4.18828 14.758 4.54693 14.758 4.98934V21.0107C14.758 21.4531 15.1121 21.8117 15.549 21.8117H19.5044C19.9413 21.8117 20.2955 21.4531 20.2955 21.0107Z'
				stroke='#333333'
				strokeWidth='1.91877'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

Columns.defaultProps = {
	className: '',
};

export default Columns;
