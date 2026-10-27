import type { ReactElement } from 'react';
import styles from './WeekdayRow.module.scss';

const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/** C8 Weekday label row. Monday-first; first-day-of-week/locale is a developer decision (edge case #41). */
const WeekdayRow = (): ReactElement => {
	return (
		<div className={styles.root}>
			{WEEKDAY_LABELS.map((label, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<span key={index} className={styles.label}>
					{label}
				</span>
			))}
		</div>
	);
};

export default WeekdayRow;
