import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BARS = [...Array(8).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = ({ theme }) => {
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
					/>
				);
			})}
		</div>
	);
};

export default ChartSkeleton;
