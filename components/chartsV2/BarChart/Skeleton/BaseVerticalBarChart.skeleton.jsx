import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BARS = [...Array(10).keys()].map(() => {
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
						width='3rem'
						height={`${bar}%`}
						variant='rounded'
						style={{
							animationDuration: '4s',
						}}
						noAnimation={fallback}
					/>
				);
			})}
		</div>
	);
};

export default ChartSkeleton;
