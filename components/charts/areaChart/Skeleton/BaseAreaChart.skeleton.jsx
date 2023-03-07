import { classes } from '../../../../utils';
import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BUMPS = [...Array(10).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const TRIANGLES = [...Array(7).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = ({ filled, theme }) => {
	if (filled) {
		return (
			<div className={classes(styles.root, styles.filled, styles[`${theme}-theme`])}>
				<div className={styles.bumps}>
					{TRIANGLES.map((bump) => {
						return (
							<Skeleton
								key={bump}
								theme={theme}
								className={styles.triangle}
								noAnimation
							/>
						);
					})}
				</div>
				<Skeleton className={styles.base} theme={theme} />
			</div>
		);
	}

	return (
		<div className={styles.root}>
			<div className={styles.line}>
				{BUMPS.map((bump) => {
					return (
						<Skeleton
							key={bump}
							theme={theme}
							className={styles.bump}
							height='0.5rem'
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ChartSkeleton;
