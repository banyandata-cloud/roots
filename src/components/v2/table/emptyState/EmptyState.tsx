import { classes } from '../../../../utils';
import { Button } from '../../buttons';
import styles from './EmptyState.module.css';
import type { EmptyStateProps } from './types';

const EmptyState = (props: EmptyStateProps) => {
	const {
		className = '',
		title = 'No Data',
		description,
		icon,
		actionLabel = 'Retry',
		onAction,
		bordered = true,
	} = props;

	return (
		<div className={classes(styles.root, bordered && styles.bordered, className)}>
			<div className={styles.content}>
				{icon && <div className={styles.icon}>{icon}</div>}
				<div className={styles.text}>
					{title && <p className={styles.title}>{title}</p>}
					{description && <p className={styles.description}>{description}</p>}
				</div>
				{onAction && (
					<Button
						type='button'
						variant='outline'
						size='xs'
						title={actionLabel}
						onClick={onAction}
					/>
				)}
			</div>
		</div>
	);
};

export default EmptyState;
