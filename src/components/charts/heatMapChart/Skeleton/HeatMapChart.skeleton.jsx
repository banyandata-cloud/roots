import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const BOXES = [...Array(36).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = ({ theme, fallback }) => {
	return (
		<div className={styles.root}>
			{BOXES.map((box) => {
				return (
					<Skeleton
						key={box}
						theme={theme}
						className={styles.box}
						height='100%'
						noAnimation={fallback}
					/>
				);
			})}
		</div>
	);
};

export default ChartSkeleton;
