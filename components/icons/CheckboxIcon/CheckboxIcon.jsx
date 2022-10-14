const CheckboxIcon = {
	Checked: (props) => {
		const { className } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='0.7' y='0.7' width='22.6' height='22.6' rx='1.3' fill='#2871E6' />
				<path
					d='M20 6L9 17L4 12'
					stroke='white'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<rect
					x='0.7'
					y='0.7'
					width='22.6'
					height='22.6'
					rx='1.3'
					stroke='#2871E6'
					strokeWidth='1.4'
				/>
			</svg>
		);
	},

	UnChecked: (props) => {
		const { className } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect
					x='0.7'
					y='0.7'
					width='22.6'
					height='22.6'
					rx='1.3'
					stroke='#AEB3BC'
					strokeWidth='1.4'
				/>
			</svg>
		);
	},
};

CheckboxIcon.Checked.defaultProps = {
	className: '',
};
CheckboxIcon.UnChecked.defaultProps = {
	className: '',
};

export default CheckboxIcon;
