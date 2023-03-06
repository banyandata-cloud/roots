import Skeleton from '../../../skeleton/Skeleton';
import styles from './Skeleton.module.css';

const ChartSkeleton = () => {
	return (
		<div className={styles.root}>
			<Skeleton className={styles.outer} width='15rem' height='15rem' variant='circle' />
			<Skeleton
				noAnimation
				className={styles.inner}
				width='7.5rem'
				height='7.5rem'
				variant='circle'
			/>
			<Skeleton noAnimation className={styles.line} width='7.5rem' />
			<Skeleton noAnimation className={styles.line} width='7.5rem' />
			<Skeleton noAnimation className={styles.line} width='7.5rem' />
		</div>
	);
};

export default ChartSkeleton;
