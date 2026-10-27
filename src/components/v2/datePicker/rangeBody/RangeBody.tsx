import type { ReactElement } from 'react';
import Calendar from '../calendar/Calendar';
import DateField from '../dateField/DateField';
import RangeArrow from '../rangeArrow/RangeArrow';
import SummaryCard from '../summaryCard/SummaryCard';
import TimeSelect from '../timeSelect/TimeSelect';
import { combineDateAndTime, DEFAULT_TIME, formatDateLabel, formatDuration } from '../utils';
import type { DatePickerController } from '../useDatePickerState';
import styles from './RangeBody.module.scss';

/** Range-mode main area: fields row, two calendars, summary card, reserved message line. */
const RangeBody = (props: { controller: DatePickerController }): ReactElement => {
	const { controller } = props;
	const {
		draft,
		now,
		future,
		time,
		leftMonth,
		rightMonth,
		hoverPreviewEnd,
		hour12,
		dataStartNote,
		presets,
		onSelectDay,
		onHoverDay,
		onHoverLeave,
		onClearStart,
		onClearEnd,
		onChangeDateField,
		onPasteRange,
		onChangeFromTime,
		onChangeToTime,
		onNavPrevYear,
		onNavPrevMonth,
		onNavNextMonth,
		onNavNextYear,
	} = controller;

	const sameDay =
		!!draft.from && !!draft.to && draft.from.toDateString() === draft.to.toDateString();
	// Falls back to DEFAULT_TIME (not undefined) when fromTime hasn't been touched yet
	// — "Starts at" still *displays* 9:00 AM as its default even though the state is
	// null, so the clamp must use that same effective value or it silently stays
	// disabled and lets "Ends at" be picked less than an hour later.
	const minEndTime = sameDay ? (draft.fromTime ?? DEFAULT_TIME) : undefined;

	const summaryState = !draft.from ? 'empty' : !draft.to ? 'start-only' : 'filled';
	// Duration must account for the selected time-of-day too (edge case: a same-day
	// 9:00->9:20 range was showing "0 mins" because only the calendar dates — both at
	// midnight — were diffed, ignoring fromTime/toTime entirely). Both TimeSelects show
	// DEFAULT_TIME (9:00 AM) whenever their value is still unset, so resolve to that
	// same fallback here too — otherwise an untouched "Ends at" (null) combines as
	// midnight and the pair can show a nonsensical negative duration.
	const durationText =
		draft.from && draft.to
			? formatDuration(
					time
						? combineDateAndTime(draft.from, draft.fromTime ?? DEFAULT_TIME)
						: draft.from,
					time ? combineDateAndTime(draft.to, draft.toTime ?? DEFAULT_TIME) : draft.to,
					{ withTime: time }
				)
			: undefined;
	const datesText =
		draft.from && draft.to
			? `${formatDateLabel(draft.from)} \u2192 ${formatDateLabel(draft.to)}`
			: undefined;
	const presetLabel = draft.preset
		? (presets.find((preset) => preset.id === draft.preset)?.label ?? null)
		: null;

	return (
		<div className={styles.root}>
			<div className={styles.stack}>
				<div className={styles.fieldsRow}>
					<DateField
						role='start'
						date={draft.from}
						future={future}
						now={now}
						fill
						onChangeDate={(date) => onChangeDateField('start', date)}
						onClear={onClearStart}
						onPasteRange={onPasteRange}
					>
						{time && (
							<TimeSelect
								label='Starts at'
								value={draft.fromTime ?? null}
								hour12={hour12}
								onChange={onChangeFromTime}
							/>
						)}
					</DateField>
					<RangeArrow className={styles.arrowOverlay} />
					<DateField
						role='end'
						date={draft.to}
						future={future}
						now={now}
						fill
						onChangeDate={(date) => onChangeDateField('end', date)}
						onClear={onClearEnd}
						onPasteRange={onPasteRange}
					>
						{time && (
							<TimeSelect
								label='Ends at'
								value={draft.toTime ?? null}
								hour12={hour12}
								onChange={onChangeToTime}
								minExclusive={minEndTime}
							/>
						)}
					</DateField>
				</div>
				<div className={styles.calendarsRow}>
					<Calendar
						month={leftMonth}
						position='left'
						now={now}
						future={future}
						selectionStart={draft.from}
						selectionEnd={draft.to}
						hoverPreviewEnd={hoverPreviewEnd}
						onSelectDay={onSelectDay}
						onHoverDay={onHoverDay}
						onHoverLeave={onHoverLeave}
						onPrevYear={onNavPrevYear}
						onPrevMonth={onNavPrevMonth}
						onNextMonth={onNavNextMonth}
						onNextYear={onNavNextYear}
					/>
					<Calendar
						month={rightMonth}
						position='right'
						now={now}
						future={future}
						selectionStart={draft.from}
						selectionEnd={draft.to}
						hoverPreviewEnd={hoverPreviewEnd}
						onSelectDay={onSelectDay}
						onHoverDay={onHoverDay}
						onHoverLeave={onHoverLeave}
						onPrevYear={onNavPrevYear}
						onPrevMonth={onNavPrevMonth}
						onNextMonth={onNavNextMonth}
						onNextYear={onNavNextYear}
					/>
				</div>
			</div>
			<div className={styles.summary}>
				<SummaryCard
					state={summaryState}
					durationText={durationText}
					datesText={datesText}
					presetLabel={presetLabel}
					startLabel={draft.from ? formatDateLabel(draft.from) : undefined}
				/>
			</div>
			<div className={styles.messageLine}>{dataStartNote}</div>
		</div>
	);
};

export default RangeBody;
