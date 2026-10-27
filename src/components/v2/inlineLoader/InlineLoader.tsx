import { classes } from '../utils';
import { Text } from '../text';
import styles from './InlineLoader.module.scss';
import type { InlineLoaderProps } from './types';

// Figma statusindicator/tick, 16px.
const SuccessIcon = () => {
	return (
		<svg
			className={classes(styles.icon, styles.successIcon)}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<circle className={styles.shape} cx='8' cy='8' r='8' />
			<path className={styles.mark} d='M4 7.5L7 10.5L12.5 5' strokeWidth='1.2' />
		</svg>
	);
};

// Figma statusindicator/error: a 14x16 hexagon centred in the 16px box.
const ErrorIcon = () => {
	return (
		<svg
			className={classes(styles.icon, styles.errorIcon)}
			viewBox='-1 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path className={styles.shape} d='M7 0L14 4V12L7 16L0 12V4L7 0Z' />
			<path className={styles.mark} d='M6.92257 4.29032V9.29032' strokeWidth='1.2' />
			<circle className={styles.dot} cx='6.92258' cy='11.0903' r='0.6' />
		</svg>
	);
};

export const InlineLoader = ({ status, text, className = '' }: InlineLoaderProps) => {
	return (
		<div className={classes(styles.container, className)} data-testid='inline-loader'>
			{status === 'loading' && <div className={styles.spinner}></div>}
			{status === 'success' && <SuccessIcon />}
			{status === 'error' && <ErrorIcon />}

			{text && (
				<Text variant='body' stroke='medium' className={styles.text}>
					{text}
				</Text>
			)}
		</div>
	);
};
