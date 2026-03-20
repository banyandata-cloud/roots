const CheckboxIcon = {
	Checked: (props: { className?: string | undefined }) => {
		const { className } = props;
		return (
			<svg
				className={className}
				width='1.5rem'
				height='1.5rem'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect width='20' height='20' rx='4' fill='#0F62FE' />
				<path
					d='M13.6718 6.99504C13.6173 6.94002 13.5523 6.89636 13.4808 6.86655C13.4093 6.83675 13.3326 6.82141 13.2551 6.82141C13.1776 6.82141 13.1009 6.83675 13.0293 6.86655C12.9578 6.89636 12.8929 6.94002 12.8383 6.99504L8.46521 11.374L6.62792 9.53085C6.57127 9.47612 6.50438 9.43308 6.43109 9.4042C6.3578 9.37532 6.27954 9.36116 6.20078 9.36252C6.12202 9.36388 6.0443 9.38074 5.97205 9.41214C5.8998 9.44354 5.83445 9.48887 5.77972 9.54553C5.72499 9.60218 5.68195 9.66906 5.65307 9.74235C5.62419 9.81564 5.61002 9.8939 5.61139 9.97267C5.61275 10.0514 5.62961 10.1292 5.66101 10.2014C5.69241 10.2736 5.73774 10.339 5.79439 10.3937L8.04844 12.6478C8.10301 12.7028 8.16794 12.7465 8.23947 12.7763C8.311 12.8061 8.38772 12.8214 8.46521 12.8214C8.5427 12.8214 8.61942 12.8061 8.69095 12.7763C8.76248 12.7465 8.82741 12.7028 8.88197 12.6478L13.6718 7.85792C13.7314 7.80295 13.779 7.73624 13.8115 7.66199C13.844 7.58773 13.8608 7.50755 13.8608 7.42648C13.8608 7.34542 13.844 7.26523 13.8115 7.19098C13.779 7.11672 13.7314 7.05001 13.6718 6.99504Z'
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
				width='1.5rem'
				height='1.5rem'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect
					x='0.5'
					y='0.5'
					width='19'
					height='19'
					rx='3.5'
					fill='white'
					stroke='#B7CADB'
				/>
			</svg>
		);
	},

	Intermediate: (props: { className?: string | undefined }) => {
		const { className } = props;
		return (
			<svg
				className={className}
				width='1.5rem'
				height='1.5rem'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<rect x='0.5' y='0.5' width='19' height='19' rx='3.5' fill='#0F62FE' />
				<path
					d='M5.9165 10H14.0832'
					stroke='white'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<rect x='0.5' y='0.5' width='19' height='19' rx='3.5' stroke='#0F62FE' />
			</svg>
		);
	},
};

export default CheckboxIcon;
