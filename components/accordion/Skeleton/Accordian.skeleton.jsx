import { Skeleton } from '../../skeleton';
import styles from './Skeleton.module.css';

const ChartSkeleton = ({ theme, fallback }) => {
	return (
		<div className={styles.root}>
            <Skeleton
				theme={theme}
				variant='rounded'
				width={50}
				height='3rem'
				noAnimation={fallback}
			/>
			<Skeleton
				theme={theme}
				variant='rounded'
				width={500}
				height='3rem'
				noAnimation={fallback}
			/>
		</div>
	);
};

export default ChartSkeleton;
