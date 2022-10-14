const RadioIcon = {
	Checked: (props) => {
		const { className } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<circle
					cx='12'
					cy='12'
					r='11.3'
					fill='#2871E6'
					stroke='#2871E6'
					strokeWidth='1.4'
				/>
				<circle cx='12' cy='12' r='6' fill='white' />
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
				<circle cx='12' cy='12' r='11.3' stroke='#AEB3BC' strokeWidth='1.4' />
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
