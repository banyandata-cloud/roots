const CheckboxIcon = {
	Checked: (props: { className?: string | undefined }) => {
		const { className } = props;
		return (
			<svg
				className={className}
				width='16'
				height='16'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M6 2.5H14C15.933 2.5 17.5 4.067 17.5 6V14C17.5 15.933 15.933 17.5 14 17.5H6C4.067 17.5 2.5 15.933 2.5 14V6C2.5 4.067 4.067 2.5 6 2.5Z'
					stroke='#1570EF'
					strokeWidth='1.5'
					className='checkbox-border'
				/>
				<path
					d='M2 6C2 3.79086 3.79086 2 6 2H14C16.2091 2 18 3.79086 18 6V14C18 16.2091 16.2091 18 14 18H6C3.79086 18 2 16.2091 2 14V6Z'
					fill='#1570EF'
					className='checkbox-bg'
				/>
				<path
					d='M10.5091 9.42269L7.87273 11.8454L6.86 10.9147L5.84545 9.98241L5.42182 10.3717L5 10.7593L6.10909 11.7769C6.88909 12.4937 7.25273 12.8145 7.33455 12.8629C7.49818 12.9598 7.65273 12.9999 7.85455 12.9999C8.05091 13.0016 8.16 12.9799 8.31818 12.9114C8.42727 12.8629 8.63818 12.6741 11.2182 10.3049L14 7.75187L13.5909 7.37593C13.3655 7.16875 13.1745 7 13.1636 7C13.1545 7 11.9582 8.08937 10.5091 9.42269Z'
					fill='white'
				/>
			</svg>
		);
	},

	UnChecked: (props: { className?: string | undefined }) => {
		const { className } = props;
		return (
			<svg
				className={className}
				width='16'
				height='16'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M6 2.5H14C15.933 2.5 17.5 4.067 17.5 6V14C17.5 15.933 15.933 17.5 14 17.5H6C4.067 17.5 2.5 15.933 2.5 14V6C2.5 4.067 4.067 2.5 6 2.5Z'
					stroke='#D5D7DA'
					strokeWidth='1.5'
					className='checkbox-border'
				/>
			</svg>
		);
	},

	Intermediate: (props: { className?: string | undefined }) => {
		const { className } = props;
		return (
			<svg
				className={className}
				width='16'
				height='16'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M6 2.5H14C15.933 2.5 17.5 4.067 17.5 6V14C17.5 15.933 15.933 17.5 14 17.5H6C4.067 17.5 2.5 15.933 2.5 14V6C2.5 4.067 4.067 2.5 6 2.5Z'
					stroke='#1570EF'
					strokeWidth='1.5'
					className='checkbox-border'
				/>
				<path
					d='M2 6C2 3.79086 3.79086 2 6 2H14C16.2091 2 18 3.79086 18 6V14C18 16.2091 16.2091 18 14 18H6C3.79086 18 2 16.2091 2 14V6Z'
					fill='#1570EF'
					className='checkbox-bg'
				/>
				<path
					d='M5.9165 10H14.0832'
					stroke='white'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		);
	},
};

export default CheckboxIcon;
