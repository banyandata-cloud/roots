import { classes } from '../../../../utils';
import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';

const COLUMNS = [...Array(4).keys()].map(() => {
	return Math.floor(Math.random() * 80 + 20);
});

const ROWS = [...Array(10).keys()];

const BaseTableSkeleton = () => {
	return ROWS.map((row, rowIndex) => {
		return (
			<div className={classes(styles.row, rowIndex === 0 ? styles.header : '')} key={row}>
				{COLUMNS.map((column, colIndex) => {
					return (
						<div
							key={column}
							className={classes(
								styles.column,
								rowIndex === 0 ? styles.th : '',
								colIndex === 0 ? styles.col1 : ''
							)}>
							<Skeleton
								width={rowIndex === 0 ? '60%' : '100%'}
								variant='rounded'
								className={styles.skeleton}
							/>
						</div>
					);
				})}
			</div>
		);
	});
};

export default BaseTableSkeleton;
