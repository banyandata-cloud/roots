type ButtonCaretProps = {
	className?: string;
};

const ButtonCaret = ({ className = '' }: ButtonCaretProps) => {
	return (
		<svg
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'>
			<path
				d='M5.58056 7.60576L5 8.18852L7.24201 10.4352C8.60938 11.8039 9.5566 12.7202 9.65972 12.7816C10.2326 13.1074 10.966 13.0653 11.4816 12.678C11.6038 12.586 12.6694 11.5355 13.8535 10.347L16 8.18852L15.408 7.59426L14.816 7L12.658 9.16617L10.5 11.3323L8.34965 9.17383C7.16944 7.98915 6.19549 7.01917 6.18403 7.01917C6.17257 7.01917 5.90139 7.28371 5.58056 7.60576Z'
				fill='currentColor'
			/>
		</svg>
	);
};

export default ButtonCaret;
