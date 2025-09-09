const AlertIcon = {
	Info: (props: { className?: string | undefined }) => {
		const { className = '' } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 25 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M12.8691 16L12.8691 12M12.8691 8H12.8591M2.86914 12C2.86914 6.47715 7.34629 2 12.8691 2C18.392 2 22.8691 6.47715 22.8691 12C22.8691 17.5228 18.392 22 12.8691 22C7.34629 22 2.86914 17.5228 2.86914 12Z'
					stroke='#0F62FE'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		);
	},

	Warning: (props: { className?: string | undefined }) => {
		const { className = '' } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 25 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M12.8691 16L12.8691 12M12.8691 8H12.8591M2.86914 12C2.86914 6.47715 7.34629 2 12.8691 2C18.392 2 22.8691 6.47715 22.8691 12C22.8691 17.5228 18.392 22 12.8691 22C7.34629 22 2.86914 17.5228 2.86914 12Z'
					stroke='#CBA006'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		);
	},
	Error: (props: { className?: string | undefined }) => {
		const { className = '' } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 25 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M12.8691 8V12M12.8691 16H12.8791M22.8691 12C22.8691 17.5228 18.392 22 12.8691 22C7.34629 22 2.86914 17.5228 2.86914 12C2.86914 6.47715 7.34629 2 12.8691 2C18.392 2 22.8691 6.47715 22.8691 12Z'
					stroke='#BD3C45'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		);
	},
	Success: (props: { className?: string | undefined }) => {
		const { className = '' } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 25 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M16.8691 9L11.3691 14.5L8.86914 12'
					stroke='#487349'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<g clipPath='url(#clip0_2992_1483)'>
					<path
						d='M12.8692 20.3333C17.4715 20.3333 21.2025 16.6023 21.2025 12C21.2025 7.39759 17.4715 3.66663 12.8692 3.66663C8.26679 3.66663 4.53583 7.39759 4.53583 12C4.53583 16.6023 8.26679 20.3333 12.8692 20.3333Z'
						stroke='#487349'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</g>
				<defs>
					<clipPath id='clip0_2992_1483'>
						<rect
							width='20'
							height='20'
							fill='white'
							transform='translate(2.86914 2)'
						/>
					</clipPath>
				</defs>
			</svg>
		);
	},
	Danger: (props: { className?: string | undefined }) => {
		const { className = '' } = props;
		return (
			<svg
				className={className}
				viewBox='0 0 25 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M15.8691 9L9.86914 15M9.86914 9L15.8691 15M22.8691 12C22.8691 17.5228 18.392 22 12.8691 22C7.34629 22 2.86914 17.5228 2.86914 12C2.86914 6.47715 7.34629 2 12.8691 2C18.392 2 22.8691 6.47715 22.8691 12Z'
					stroke='#BD3C45'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		);
	},
};

export default AlertIcon;
