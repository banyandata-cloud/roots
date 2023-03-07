import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BARS = [...Array(25).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = () => {
	return (
		<div className={styles.root}>
			{BARS.map((bar) => {
				return <Skeleton key={bar} width='1rem' height={`${bar}%`} variant='rounded' />;
			})}
		</div>
	);
};

export default ChartSkeleton;
