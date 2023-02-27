import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BARS = [...Array(10).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = () => {
	return (
		<div className={styles.root}>
			{BARS.map((bar) => {
				return <Skeleton key={bar} variant='rounded' width={`${bar}%`} height='1rem' />;
			})}
		</div>
	);
};

export default ChartSkeleton;
