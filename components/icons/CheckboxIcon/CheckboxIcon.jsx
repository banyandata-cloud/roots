const CheckboxIcon = {
	Checked: (props) => {
		const { className } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' fill='white' />
				<path
					d='M14.6668 6.5L8.25016 12.9167L5.3335 10'
					stroke='#0F62FE'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' stroke='#0F62FE' />
			</svg>
		);
	},

	UnChecked: (props) => {
		const { className } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' fill='white' />
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' stroke='#888888' />
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
