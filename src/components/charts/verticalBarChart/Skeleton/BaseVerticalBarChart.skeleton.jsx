import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BARS = [...Array(10).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const BARS2 = [...Array(8).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = ({ theme, fallback, vertical }) => {
	return vertical ? (
		<div className={styles.vertical}>
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
	) : (
		<div className={styles.horizontal}>
			{BARS2.map((bar) => {
				return (
					<Skeleton
						key={bar}
						theme={theme}
						width={`${bar}%`}
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
