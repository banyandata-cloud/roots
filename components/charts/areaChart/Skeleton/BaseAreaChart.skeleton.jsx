import { classes } from '../../../../utils';
import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BUMPS = [...Array(10).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = ({ filled }) => {
	if (filled) {
		return (
			<div className={classes(styles.root, styles.filled)}>
				<div className={styles.bumps}>
					{BUMPS.map((bump) => {
						return <Skeleton key={bump} className={styles.triangle} height='0.5rem' />;
					})}
				</div>
				<Skeleton className={styles.base} />
			</div>
		);
	}

	return (
		<div className={styles.root}>
			{BUMPS.map((bump) => {
				return <Skeleton key={bump} className={styles.bump} height='0.5rem' />;
			})}
		</div>
	);
};

export default ChartSkeleton;
