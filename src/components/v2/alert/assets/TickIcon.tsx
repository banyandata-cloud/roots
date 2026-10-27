import styles from '../Alert.module.scss';

// Figma statusindicator/tick: a 20px filled circle (currentColor) with a white check.
const TickIcon = ({ className }: { className?: string | undefined }) => (
	<svg
		className={className}
		width='20'
		height='20'
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		aria-hidden='true'
	>
		<circle cx='10' cy='10' r='10' fill='currentColor' />
		<path
			className={styles['mark-stroke']}
			d='M5 9.375L8.75 13.125L15.625 6.25'
			strokeWidth='1.2'
		/>
	</svg>
);

export default TickIcon;
