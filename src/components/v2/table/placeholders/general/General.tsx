import type { ComponentType } from 'react';
import { classes } from '../../../utils';
import { EmptyState } from '../../emptyState';
import styles from './General.module.scss';

interface GeneralPlaceholderProps {
	className?: string;
	customPlaceholder?: ComponentType | undefined;
	title?: string | undefined;
	description?: string | undefined;
	onRetry?: (() => void) | undefined;
	retryLabel?: string | undefined;
}

const General = ({
	className = '',
	customPlaceholder: CustomPlaceholder,
	title,
	description,
	onRetry,
	retryLabel,
}: GeneralPlaceholderProps) => {
	return (
		<div className={classes(styles.root, className)}>
			{CustomPlaceholder ? (
				<CustomPlaceholder />
			) : (
				<EmptyState
					bordered={false}
					title={title}
					description={description}
					onAction={onRetry}
					actionLabel={retryLabel}
				/>
			)}
		</div>
	);
};

export default General;
