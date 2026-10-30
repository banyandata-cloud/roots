import type { ReactElement } from 'react';
import { classes } from '../../utils';
import styles from './DayCell.module.scss';
import type { DayCellProps } from './types';

const DayCell = (props: DayCellProps): ReactElement => {
	const { day, onSelect, onHoverEnter, onHoverLeave, size = 'md' } = props;
	const {
		date,
		inCurrentMonth,
		isToday,
		isDisabled,
		isSelectionStart,
		isSelectionEnd,
		isHoverPreview,
		band,
	} = day;

	if (!inCurrentMonth) {
		return <div className={classes(styles.root, styles.blank)} aria-hidden='true' />;
	}

	const isSelected = isSelectionStart || isSelectionEnd;
	const label = String(date.getDate());

	return (
		<div
			className={classes(
				styles.root,
				styles[`size-${size}`],
				band === 'full' && styles.band,
				band === 'start' && styles['band-start'],
				band === 'end' && styles['band-end'],
				isHoverPreview && styles['hover-preview']
			)}
		>
			<button
				type='button'
				className={classes(
					styles.button,
					isSelected && styles.selected,
					isDisabled && styles.disabled
				)}
				disabled={isDisabled}
				aria-pressed={isSelected}
				aria-current={isToday ? 'date' : undefined}
				aria-label={date.toDateString()}
				onClick={() => onSelect(date)}
				onMouseEnter={() => onHoverEnter?.(date)}
				onMouseLeave={() => onHoverLeave?.()}
			>
				{label}
				{isToday && <span className={styles['today-dot']} aria-hidden='true' />}
			</button>
		</div>
	);
};

export default DayCell;
