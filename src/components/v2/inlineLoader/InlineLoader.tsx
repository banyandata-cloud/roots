import { classes } from '../../../utils';
import { Text } from '../text';
import styles from './InlineLoader.module.css';
import type { InlineLoaderProps } from './types';

const SuccessIcon = ({ className }: { className?: string | undefined }) => {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<circle cx='12' cy='12' r='12' fill='#10B981' />
			<path
				d='M7 13l3 3 7-7'
				stroke='#ffffff'
				strokeWidth='2.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

const ErrorIcon = ({ className }: { className?: string | undefined }) => {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M12 1L22 6.5V17.5L12 23L2 17.5V6.5L12 1Z' fill='#DC2626' />
			<path
				d='M12 7V14M12 17V18'
				stroke='#ffffff'
				strokeWidth='2.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export const InlineLoader = ({ status, text, className = '' }: InlineLoaderProps) => {
	return (
		<div className={classes(styles.container, className)} data-testid='inline-loader'>
			<div className={styles.iconWrapper}>
				{status === 'loading' && <div className={styles.spinner}></div>}
				{status === 'success' && <SuccessIcon className={styles.successIcon} />}
				{status === 'error' && <ErrorIcon className={styles.errorIcon} />}
			</div>

			{text && <Text className={styles.text}>{text}</Text>}
		</div>
	);
};
