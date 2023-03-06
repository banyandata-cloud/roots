import { classes } from '../../../../utils';
import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BUMPS = [...Array(10).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const TRIANGLES = [...Array(7).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = ({ filled }) => {
	if (filled) {
		return (
			<div className={classes(styles.root, styles.filled)}>
				<div className={styles.bumps}>
					{TRIANGLES.map((bump) => {
						return <Skeleton key={bump} className={styles.triangle} noAnimation />;
					})}
				</div>
				<Skeleton className={styles.base} />
			</div>
		);
	}

	return (
		<div className={styles.root}>
			<div className={styles.line}>
				{BUMPS.map((bump) => {
					return <Skeleton key={bump} className={styles.bump} height='0.5rem' />;
				})}
			</div>
		</div>
	);
};

export default ChartSkeleton;
