interface ButtonCloseIconProps {
	/** Size of the square box in px; the cross itself is always 8px (Figma button-icon/close). */
	size?: number;
	className?: string | undefined;
}

const ButtonCloseIcon = ({ size = 24, className }: ButtonCloseIconProps) => {
	const start = size / 2 - 4;
	const end = size / 2 + 4;

	return (
		<svg
			className={className}
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path
				d={`M${start} ${start}L${end} ${end}M${start} ${end}L${end} ${start}`}
				stroke='currentColor'
				strokeWidth='1.2'
				strokeLinecap='round'
			/>
		</svg>
	);
};

export default ButtonCloseIcon;
