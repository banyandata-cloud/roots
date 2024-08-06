import { classes } from '../../../utils';
import { Skeleton } from '../../skeleton';
import styles from './Skeleton.module.css';

const TILES = [...Array(4).keys()].map(() => {
	return 70;
});

const ChartSkeleton = ({ theme, fallback, v2 }) => {
	return (
		<div className={classes(styles.root, v2 ? styles.v2 : null)}>
			{TILES.map((tile) => {
				return (
					<Skeleton
						key={tile}
						theme={theme}
						variant={v2 ? 'ellipse' : 'rounded'}
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
