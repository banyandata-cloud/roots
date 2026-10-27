import styles from '../Alert.module.scss';

// Figma statusindicator/info: a 20px filled circle (currentColor) with a white "i".
const InfoIcon = ({ className }: { className?: string | undefined }) => (
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
		<circle className={styles['mark-fill']} cx='9.75' cy='6.39' r='0.75' />
		<rect className={styles['mark-fill']} x='9' y='8.08' width='1.5' height='6.75' />
	</svg>
);

export default InfoIcon;
