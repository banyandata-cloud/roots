import { BaseCell } from '../../../../cell';
import { Skeleton } from '../../../../skeleton';
import styles from './Skeleton.module.css';

const TableFiltersSkeleton = ({ theme }) => {
	return (
		<BaseCell
			className={styles.root}
			flexible
			component1={<Skeleton className={styles.filter} theme={theme} />}
			component2={<Skeleton className={styles.search} theme={theme} />}
			component3={
				<BaseCell
					flexible
					size='auto'
					component1={<Skeleton className={styles.columns} theme={theme} />}
					component2={<Skeleton className={styles.refresh} theme={theme} />}
					component3={<Skeleton className={styles.settings} theme={theme} />}
				/>
			}
		/>
	);
};

export default TableFiltersSkeleton;
