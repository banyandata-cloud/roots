import { Skeleton } from '../../skeleton';
import styles from './Skeleton.module.css';

const TILES = [...Array(3).keys()].map(() => {
	return 70;
});

const ChartSkeleton = ({ theme, fallback }) => {
	return (
		<div className={styles.root}>
			{TILES.map((tile) => {
				return (
					<Skeleton
						key={tile}
						theme={theme}
						variant='rounded'
						width={`${tile}%`}
						height='3rem'
						noAnimation={fallback}
					/>
				);
			})}
		</div>
	);
};

export default ChartSkeleton;
