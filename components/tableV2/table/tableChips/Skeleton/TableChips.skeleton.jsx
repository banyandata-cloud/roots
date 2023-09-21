import { BaseCell } from '../../../../cell';
import { Skeleton } from '../../../../skeleton';
import styles from './Skeleton.module.css';

const CHIPS = [...Array(5).keys()];

const TableChipsSkeleton = ({ theme }) => {
	return (
		<BaseCell
			flexible
			className={styles.root}
			component1={<Skeleton variant='circle' theme={theme} />}
			component2={CHIPS.map((chip) => {
				return <Skeleton key={chip} variant='ellipse' theme={theme} />;
			})}
		/>
	);
};

export default TableChipsSkeleton;
