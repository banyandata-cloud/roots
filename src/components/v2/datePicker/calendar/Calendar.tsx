import type { ReactElement } from 'react';
import { forwardRef } from 'react';
import { isBefore, startOfMonth } from 'date-fns';
import { classes } from '../../../../utils';
import { buildDayInfo, buildMonthMatrix, formatMonthTitle } from '../utils';
import DayCell from '../dayCell/DayCell';
import MonthHeader from '../monthHeader/MonthHeader';
import WeekdayRow from '../weekdayRow/WeekdayRow';
import styles from './Calendar.module.css';
import type { CalendarProps } from './types';

const DAYS_PER_WEEK = 7;

/** One month block (C7 + C8 + C9), always 6 rows so the popover never changes height. */
const Calendar = forwardRef<HTMLDivElement, CalendarProps>((props, ref): ReactElement => {
	const {
		month,
		position,
		now,
		future,
		selectionStart,
		selectionEnd,
		hoverPreviewEnd,
		onSelectDay,
		onHoverDay,
		onHoverLeave,
		onPrevYear,
		onPrevMonth,
		onNextMonth,
		onNextYear,
	} = props;

	const days = buildMonthMatrix(month);
	const weeks: Date[][] = [];
	for (let i = 0; i < days.length; i += DAYS_PER_WEEK) {
		weeks.push(days.slice(i, i + DAYS_PER_WEEK));
	}

	return (
		<div ref={ref} className={classes(styles.root, position === 'single' && styles.wide)}>
			<MonthHeader
				title={formatMonthTitle(month)}
				position={position}
				onPrevYear={onPrevYear}
				onPrevMonth={onPrevMonth}
				onNextMonth={onNextMonth}
				onNextYear={onNextYear}
				forwardDisabled={!future && !isBefore(startOfMonth(month), startOfMonth(now))}
			/>
			<div className={styles.grid}>
				<WeekdayRow />
				{weeks.map((week, weekIndex) => (
					// eslint-disable-next-line react/no-array-index-key
					<div key={weekIndex} className={styles.week}>
						{week.map((date) => (
							<DayCell
								key={date.toISOString()}
								day={buildDayInfo({
									date,
									month,
									now,
									future,
									selectionStart,
									selectionEnd,
									hoverPreviewEnd,
								})}
								onSelect={onSelectDay}
								onHoverEnter={onHoverDay}
								onHoverLeave={onHoverLeave}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
});

Calendar.displayName = 'Calendar';

export default Calendar;
