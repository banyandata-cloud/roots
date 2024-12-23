import { classes } from '../../../../utils';
import Skeleton from '../../../skeleton/Skeleton';
import styles from './Skeleton.module.css';

const ChartSkeleton = ({ theme, fallback }) => {
	return (
		<div className={classes(styles.root, styles[`${theme}-theme`])}>
			<Skeleton
				theme={theme}
				className={styles.outer}
				width='12.5rem'
				height='12.5rem'
				variant='circle'
				noAnimation={fallback}
			/>
			<Skeleton
				noAnimation
				className={styles.inner}
				width='7.5rem'
				height='7.5rem'
				variant='circle'
			/>
			<Skeleton noAnimation className={styles.line} width='6.25rem' />
			<Skeleton noAnimation className={styles.line} width='6.25rem' />
			<Skeleton noAnimation className={styles.line} width='6.25rem' />
		</div>
	);
};

export default ChartSkeleton;
