import React from 'react';
import styles from './ProgressBar.module.scss';

export type ProgressBarSize = 'sm' | 'md';

interface ProgressBarProps {
	label?: string;
	description?: string;
	isActive?: boolean;
	isCompleted?: boolean;
	size?: ProgressBarSize;
	className?: string;
	style?: React.CSSProperties;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	label,
	description,
	isActive = false,
	isCompleted = false,
	size = 'sm',
	className,
	style,
}) => {
	return (
		<div
			className={[
				styles.progressBar,
				styles[`progressBar--${size}`],
				isActive ? styles['progressBar--active'] : '',
				isCompleted ? styles['progressBar--completed'] : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={style}>
			{label && (
				<span
					className={[
						styles.label,
						styles[`label--${size}`],
						isActive ? styles['label--active'] : '',
					]
						.filter(Boolean)
						.join(' ')}>
					{label}
				</span>
			)}
			{description && (
				<span
					className={[
						styles.description,
						styles[`description--${size}`],
						isActive ? styles['description--active'] : '',
					]
						.filter(Boolean)
						.join(' ')}>
					{description}
				</span>
			)}
		</div>
	);
};

export default ProgressBar;
