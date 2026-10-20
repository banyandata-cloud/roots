import type { ReactElement } from 'react';
import { ArrowRightIcon } from '../icons';
import styles from './RangeArrow.module.css';

/**
 * C6 Range arrow: joins the Start and End date fields. Never shows a number — the
 * length of the range lives only in the Summary card — and is never interactive.
 */
const RangeArrow = (): ReactElement => {
	return (
		<div className={styles.root} aria-hidden='true'>
			<ArrowRightIcon className={styles.icon} />
		</div>
	);
};

export default RangeArrow;
