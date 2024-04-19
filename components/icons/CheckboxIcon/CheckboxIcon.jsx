const CheckboxIcon = {
	Checked: (props) => {
		const { className } = props;
		return (
			<svg
				className={className}
				width='1.5rem'
				height='1.5rem'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' fill='#EDF5FF' />
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
				width='1.5rem'
				height='1.5rem'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' fill='white' />
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' stroke='#333333' />
			</svg>
		);
	},

	Intermediate: ({ className }) => {
		return (
			<svg
				className={className}
				width='1.5rem'
				height='1.5rem'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' fill='#EDF5FF' />
				<path
					d='M5.9165 10H14.0832'
					stroke='#0F62FE'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<rect x='0.5' y='0.5' width='19' height='19' rx='5.5' stroke='#0F62FE' />
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
