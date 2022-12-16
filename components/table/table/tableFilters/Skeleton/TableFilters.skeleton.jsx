import { BaseCell } from '../../../../cell';
import { Skeleton } from '../../../../skeleton';
import styles from './Skeleton.module.css';

const TableFiltersSkeleton = () => {
	return (
		<BaseCell
			className={styles.root}
			flexible
			component1={<Skeleton className={styles.filter} />}
			component2={<Skeleton className={styles.search} />}
			component3={
				<BaseCell
					flexible
					size='auto'
					component1={<Skeleton className={styles.columns} />}
					component2={<Skeleton className={styles.refresh} />}
					component3={<Skeleton className={styles.settings} />}
				/>
			}
		/>
	);
};

export default TableFiltersSkeleton;
