import type { ReactElement } from 'react';
import Calendar from '../calendar/Calendar';
import DateField from '../dateField/DateField';
import TimeModeSwitch from '../timeModeSwitch/TimeModeSwitch';
import TimeRangeCard from '../timeRangeCard/TimeRangeCard';
import TimeSelect from '../timeSelect/TimeSelect';
import type { DatePickerController } from '../useDatePickerState';
import styles from './SingleBody.module.scss';

/** Single-date main area: optional time-mode switch, one date card, one calendar. */
const SingleBody = (props: { controller: DatePickerController }): ReactElement => {
	const { controller } = props;
	const {
		draft,
		now,
		future,
		time,
		leftMonth,
		hour12,
		dataStartNote,
		onSelectDay,
		onClearStart,
		onChangeDateField,
		onChangeFromTime,
		onChangeToTime,
		onChangeTimeMode,
		onNavPrevYear,
		onNavPrevMonth,
		onNavNextMonth,
		onNavNextYear,
	} = controller;

	const timeMode = draft.timeMode ?? 'whole-day';

	// "Particular time" embeds its single time row inside the date card (with a divider).
	// "Time range" is a separate, full-width card below the date card — not embedded.
	const embeddedTimeContent =
		time && timeMode === 'particular' ? (
			<TimeSelect
				label='At'
				value={draft.fromTime ?? null}
				hour12={hour12}
				onChange={onChangeFromTime}
			/>
		) : null;

	return (
		<div className={styles.root}>
			<div className={styles.stack}>
				{time && (
					<TimeModeSwitch
						value={timeMode}
						onChange={onChangeTimeMode}
						disabled={!draft.from}
					/>
				)}
				<DateField
					role='date'
					date={draft.from}
					future={future}
					now={now}
					onChangeDate={(date) => onChangeDateField('date', date)}
					onClear={onClearStart}
				>
					{embeddedTimeContent}
				</DateField>
				{time && timeMode === 'range' && (
					<TimeRangeCard
						fromTime={draft.fromTime ?? null}
						toTime={draft.toTime ?? null}
						onChangeFromTime={onChangeFromTime}
						onChangeToTime={onChangeToTime}
						hour12={hour12}
						disabled={!draft.from}
					/>
				)}
				<Calendar
					month={leftMonth}
					position='single'
					now={now}
					future={future}
					selectionStart={draft.from}
					selectionEnd={draft.from}
					hoverPreviewEnd={null}
					onSelectDay={onSelectDay}
					onHoverDay={() => undefined}
					onHoverLeave={() => undefined}
					onPrevYear={onNavPrevYear}
					onPrevMonth={onNavPrevMonth}
					onNextMonth={onNavNextMonth}
					onNextYear={onNavNextYear}
				/>
			</div>
			<div className={styles.messageLine}>{dataStartNote}</div>
		</div>
	);
};

export default SingleBody;
