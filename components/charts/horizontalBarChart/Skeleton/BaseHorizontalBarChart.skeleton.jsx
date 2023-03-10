import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BARS = [...Array(8).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = ({ theme, fallback }) => {
	return (
		<div className={styles.root}>
			{BARS.map((bar) => {
				return (
					<Skeleton
						key={bar}
						theme={theme}
						variant='rounded'
						width={`${bar}%`}
						height='3rem'
						noAnimation={fallback}
					/>
				);
			})}
		</div>
	);
};

export default ChartSkeleton;
