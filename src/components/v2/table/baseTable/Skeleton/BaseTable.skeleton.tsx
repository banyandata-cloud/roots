import type { ReactElement } from 'react';
import { classes } from '../../../utils';
import styles from './Skeleton.module.scss';

const COLUMNS = Array.from({ length: 4 }, (_, index) => ({
	id: index,
	headerWidth: '60%',
}));

const ROWS = Array.from({ length: 30 }, (_, index) => index);

// Loading placeholder for the table. It is internal to the table: no other v2 component
// has a skeleton.
const BaseTableSkeleton = (): ReactElement[] => {
	return ROWS.map((row) => {
		const isHeader = row === 0;

		return (
			<div className={classes(styles.row, isHeader ? styles.header : '')} key={row}>
				{COLUMNS.map((column) => (
					<div
						key={column.id}
						className={classes(
							styles.column,
							isHeader ? styles.th : '',
							column.id === 0 ? styles.col1 : ''
						)}
					>
						<span
							data-elem='skeleton'
							className={styles.skeleton}
							style={{ width: isHeader ? column.headerWidth : '100%' }}
						/>
					</div>
				))}
			</div>
		);
	});
};

export default BaseTableSkeleton;
