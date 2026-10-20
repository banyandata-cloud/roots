import type { ReactElement } from 'react';
import Calendar from '../calendar/Calendar';
import DateField from '../dateField/DateField';
import RangeArrow from '../rangeArrow/RangeArrow';
import SummaryCard from '../summaryCard/SummaryCard';
import TimeSelect from '../timeSelect/TimeSelect';
import { formatDateLabel, formatDuration } from '../utils';
import type { DatePickerController } from '../useDatePickerState';
import styles from './RangeBody.module.css';

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
	const minEndTime = sameDay ? (draft.fromTime ?? undefined) : undefined;

	const summaryState = !draft.from ? 'empty' : !draft.to ? 'start-only' : 'filled';
	const durationText =
		draft.from && draft.to
			? formatDuration(draft.from, draft.to, { withTime: time })
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
			<div className={styles.fieldsRow}>
				<DateField
					role='start'
					date={draft.from}
					future={future}
					now={now}
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
				<RangeArrow />
				<DateField
					role='end'
					date={draft.to}
					future={future}
					now={now}
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
			<SummaryCard
				state={summaryState}
				durationText={durationText}
				datesText={datesText}
				presetLabel={presetLabel}
				startLabel={draft.from ? formatDateLabel(draft.from) : undefined}
			/>
			<div className={styles.messageLine}>{dataStartNote}</div>
		</div>
	);
};

export default RangeBody;
