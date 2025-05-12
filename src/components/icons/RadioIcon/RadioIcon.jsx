const RadioIcon = {
	Checked: (props) => {
		const { className } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='0.5' y='0.5' width='19' height='19' rx='9.5' fill='#EDF5FF' />
				<circle fill='#0F62FE' cx='10' cy='10' r='4' />
				<rect x='0.5' y='0.5' width='19' height='19' rx='9.5' stroke='#0F62FE' />
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
				<rect x='0.5' y='0.5' width='19' height='19' rx='9.5' stroke='#888888' />
			</svg>
		);
	},
};

RadioIcon.Checked.defaultProps = {
	className: '',
};
RadioIcon.UnChecked.defaultProps = {
	className: '',
};

export default RadioIcon;
